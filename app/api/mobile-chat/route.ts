import { generateText } from "ai"
import { getSupabaseServerClient } from "@/lib/supabase/server"

// Mobile chat endpoint consumed by the native app (lib/api/groq.ts).
// Contract: POST { messages: [{ role, content }] } -> { response: string }.
// Non-streaming on purpose so the existing app build keeps working with no rebuild.
// Brain: gpt-4o-mini (chosen over Groq for concurrency headroom) + deterministic
// RAG grounding over the hadith database + server-side safety guardrails.

export const maxDuration = 30

const SYSTEM_PROMPT = `You are the Authentic Hadith assistant, a knowledgeable and respectful Islamic study companion specializing in hadith.

Your role:
- Help users understand the meaning, context, and chain of narration (isnad) of hadiths.
- Provide scholarly interpretations and note authenticity grades (Sahih, Hasan).
- Answer questions about Islamic teachings grounded in authentic narrations.

Grounding rules:
- Relevant narrations from the app's database may be provided below under "RETRIEVED HADITHS". When present, base your answer on them and cite the collection, number, narrator, and grade.
- Prefer hadiths graded Sahih or Hasan. If a retrieved narration is weak, do not present it as authoritative.
- If no hadiths are retrieved, you may give general guidance grounded in well-known authentic teachings, and suggest the user search the app for specific narrations. NEVER fabricate a hadith, a chain of narration, a grade, or a citation.

Critical content safety rules (you MUST follow these):
- You are NOT a mufti. NEVER issue fatwas or definitive religious rulings. Say "scholars have said..." or "according to [scholar/school]..." and recommend the user consult a qualified local scholar for personal rulings.
- NEVER provide medical, legal, financial, or psychological advice. Direct users to qualified professionals.
- NEVER encourage self-harm, violence, extremism, or hatred toward any group. If a user expresses distress, gently encourage them to seek help from a qualified counselor or a crisis helpline.
- For sensitive topics (slavery, warfare, gender), provide full historical context and note how classical scholars understood the text within its time period.
- NEVER claim that one school of thought (madhab) is the only correct interpretation.
- Stay within the domain of Islamic knowledge. Politely decline questions unrelated to Islamic teachings.

Keep answers clear and concise (2-4 paragraphs). Use accessible language while staying scholarly and accurate.`

const STOPWORDS = new Set(
  "the a an of to in on and or for is are was were be been with about what when how why who which that this these those tell me give show explain please can you your i my our we us hadith hadiths narration narrations regarding say said says according".split(
    /\s+/,
  ),
)

function extractKeywords(text: string): string[] {
  const words = (text.toLowerCase().match(/[a-z]{3,}/g) || []).filter((w) => !STOPWORDS.has(w))
  return Array.from(new Set(words)).slice(0, 5)
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

    // RAG grounding — best-effort, never blocks the answer.
    let retrieved = ""
    try {
      if (keywords.length) {
        const supabase = await getSupabaseServerClient()
        const orFilter = keywords
          .map((k) => `english_translation.ilike.%${k}%,narrator.ilike.%${k}%`)
          .join(",")
        const { data, error } = await supabase
          .from("hadiths")
          .select("hadith_number, collection, english_translation, narrator, grade, reference")
          .or(orFilter)
          .limit(5)

        if (!error && data && data.length) {
          retrieved = data
            .map((h: any, i: number) => {
              let text = h.english_translation || ""
              if (typeof text === "string" && text.startsWith("{") && text.includes('"text"')) {
                try {
                  text = JSON.parse(text).text || text
                } catch {
                  // keep original
                }
              }
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
      ? `${SYSTEM_PROMPT}\n\nRETRIEVED HADITHS:\n${retrieved}`
      : `${SYSTEM_PROMPT}\n\nRETRIEVED HADITHS: (none matched this query)`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system,
      messages,
      maxOutputTokens: 1024,
      temperature: 0.6,
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
