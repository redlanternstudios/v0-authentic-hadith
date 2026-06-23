import { generateText } from "ai"
import { getSupabaseServerClient } from "@/lib/supabase/server"

// Mobile chat endpoint consumed by the native app (lib/api/groq.ts).
// Contract: POST { messages: [{ role, content }] } -> { response: string }.
// Non-streaming on purpose so the existing app build keeps working with no rebuild.
// Brain: gpt-4o-mini (chosen over Groq for concurrency headroom) + STRICT RAG
// grounding over the hadith database + server-side safety guardrails.
//
// STRICT GROUNDING (provenance is non-negotiable for an authentic-hadith app):
// the model may ONLY cite hadiths that this route actually retrieved from the
// hadiths table. It must NEVER state a hadith number, collection, narrator, or
// grade from its own training. If nothing relevant is retrieved, it says so.

export const maxDuration = 30

const SYSTEM_PROMPT = `You are the Authentic Hadith assistant, a knowledgeable and respectful Islamic study companion specializing in hadith.

Your role:
- Help users understand the meaning, context, and chain of narration (isnad) of hadiths.
- Explain authenticity grades (Sahih, Hasan) when they are provided to you.
- Answer questions about Islamic teachings grounded ONLY in the narrations provided to you below.

STRICT GROUNDING RULES (you MUST follow these — they are the most important rules):
- You may ONLY cite, quote, reference, or attribute a hadith that appears in the "RETRIEVED HADITHS" block below.
- NEVER state a hadith number, collection name, narrator, chain, or authenticity grade that is not present in that block. Do not recall hadiths from your own training or memory.
- If the retrieved hadiths do not answer the user's question, or none are provided, say clearly: you could not find a specific authenticated narration for that in the collection, and suggest they use the app's Search feature. You may then offer brief GENERAL thematic guidance, but you MUST NOT invent, recall, or cite any specific hadith, number, chain, or grade from outside the retrieved set.
- When you do cite a retrieved hadith, include its collection, number, narrator, and grade exactly as given.

Critical content safety rules (you MUST also follow these):
- You are NOT a mufti. NEVER issue fatwas or definitive religious rulings. Say "scholars have said..." or "according to [scholar/school]..." and recommend the user consult a qualified local scholar for personal rulings.
- NEVER provide medical, legal, financial, or psychological advice. Direct users to qualified professionals.
- NEVER encourage self-harm, violence, extremism, or hatred toward any group. If a user expresses distress, gently encourage them to seek help from a qualified counselor or a crisis helpline.
- For sensitive topics (slavery, warfare, gender), provide full historical context and note how classical scholars understood the text within its time period.
- NEVER claim that one school of thought (madhab) is the only correct interpretation.
- Stay within the domain of Islamic knowledge. Politely decline questions unrelated to Islamic teachings.

Keep answers clear and concise (2-4 paragraphs). Use accessible language while staying scholarly and accurate.`

// Generic/meta words that carry no hadith-topic signal. Stripped before search so
// the retrieval keys on real content (e.g. "kindness"), not query filler.
const STOPWORDS = new Set(
  (
    "the a an of to in on at by it its is are am was were be been being and or but for nor so yet with about into from over under " +
    "what when how why who whom which that this these those there here then than as if not no yes do does did done has have had " +
    "tell me give show explain please can could would should will shall may might must want need know find get see read share " +
    "you your yours i my me mine we us our ours they them their he she his her hadith hadith's hadiths narration narrations " +
    "authentic authenticity source sources reference references grade graded grading sahih hasan daif weak chain isnad collection " +
    "regarding related topic example examples something anything everything please kindly thanks thank also more most some any " +
    "say said says according mention mentioned talk speak speaks about list quote cite citing"
  ).split(/\s+/),
)

function extractKeywords(text: string): string[] {
  const words = (text.toLowerCase().match(/[a-z]{3,}/g) || []).filter((w) => !STOPWORDS.has(w))
  return Array.from(new Set(words)).slice(0, 6)
}

function cleanText(raw: unknown): string {
  let text = typeof raw === "string" ? raw : ""
  if (text.startsWith("{") && text.includes('"text"')) {
    try {
      text = JSON.parse(text).text || text
    } catch {
      // keep original
    }
  }
  return text
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body?.messages

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Invalid request: messages must be a non-empty array" },
        { status: 400 },
      )
    }

    const lastUser = [...messages].reverse().find((m: any) => m?.role === "user")?.content ?? ""
    const keywords = extractKeywords(String(lastUser))

    // RAG grounding. Each keyword gets its OWN query + quota so a common word
    // (e.g. "others") can't crowd out the rare topic word (e.g. "kindness").
    // Then rank by specificity: longer keywords weigh more, so on-topic
    // narrations beat rows that only matched a generic stray word.
    let retrieved = ""
    try {
      if (keywords.length) {
        const supabase = await getSupabaseServerClient()

        const perKeyword = await Promise.all(
          keywords.map((k) =>
            supabase
              .from("hadiths")
              .select("id, hadith_number, collection, english_text, english_translation, narrator, grade, reference")
              // CONTENT INTEGRITY (AUDIT-061): only Bukhari + Muslim grades are
              // scholar-trustworthy. Restrict the assistant to the Sahihayn so it
              // never cites an unreliable grade from the Sunan. 14,444 hadiths.
              .in("collection", ["sahih-bukhari", "sahih-muslim"])
              .or(`english_text.ilike.%${k}%,english_translation.ilike.%${k}%,narrator.ilike.%${k}%`)
              .limit(10)
              .then((r) => r.data || []),
          ),
        )

        // Merge + dedupe by hadith id.
        const byId = new Map<number, any>()
        for (const rows of perKeyword) for (const h of rows) if (!byId.has(h.id)) byId.set(h.id, h)

        const scored = Array.from(byId.values())
          .map((h: any) => {
            const text = cleanText(h.english_text || h.english_translation)
            const hay = `${text} ${h.narrator || ""}`.toLowerCase()
            // Specificity-weighted score: a longer keyword present is worth more.
            const score = keywords.reduce((n, k) => (hay.includes(k) ? n + k.length : n), 0)
            return { h, text, score }
          })
          .filter((r) => r.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)

        if (scored.length) {
          retrieved = scored
            .map(({ h, text }, i) => {
              const grade = h.grade ? `, ${h.grade}` : ""
              return `${i + 1}. [${h.collection} #${h.hadith_number}${grade}] Narrated ${h.narrator || "—"}: ${text}`
            })
            .join("\n\n")
        }
      }
    } catch (toolError) {
      console.error("[mobile-chat] hadith retrieval failed:", toolError)
    }

    const system = retrieved
      ? `${SYSTEM_PROMPT}\n\nRETRIEVED HADITHS (the ONLY hadiths you may cite):\n${retrieved}`
      : `${SYSTEM_PROMPT}\n\nRETRIEVED HADITHS: (none matched — do NOT cite any specific hadith; tell the user you could not find a specific narration and suggest the Search feature.)`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system,
      messages,
      maxOutputTokens: 1024,
      temperature: 0.4,
      maxRetries: 2,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("[mobile-chat] error:", error)
    return Response.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
