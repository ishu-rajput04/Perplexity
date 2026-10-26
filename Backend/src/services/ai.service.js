import { ChatGoogle } from "@langchain/google";
import { HumanMessage, SystemMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai"

const geminiModel = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "voxtral-small-2507", 
  apiKey: process.env.MISTRAL_API_KEY,
})

export async function AiResponse(message) {
  const response = await geminiModel.invoke([
    new HumanMessage(message)
  ])
  return response.text
}


export async function genrateTitle(message) {
  const title = await mistralModel.invoke([
    new SystemMessage(
      `You are a title generator. You will be given a text and you will generate a title for it. The title should be short, catchy, and relevant to the text.
      title should be 2 - 4 words long. Do not use any special characters in the title.`
    ),
    new HumanMessage(`generate a title for the following text: ${message}`)
  ])
  return title.text
} 