import { createOpenAI } from "@ai-sdk/openai"

// DeepSeek is OpenAI-API-compatible — configured via custom baseURL
const deepseekProvider = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY!,
  baseURL: "https://api.deepseek.com/v1",
  name: "deepseek",
})

// deepseek-chat (V3) — fast, low cost, general use
export const deepseekChat = deepseekProvider("deepseek-chat")

// deepseek-reasoner (R1) — chain-of-thought, use for complex reasoning
export const deepseekReasoner = deepseekProvider("deepseek-reasoner")
