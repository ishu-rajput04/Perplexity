
import readline from "readline/promises";
import { ChatGoogle } from "@langchain/google";
import { createAgent, HumanMessage } from "langchain";
import { tool } from "@langchain/core/tools";
import path from "node:path";



import * as z from "zod"
import { sendEmail } from "./email.service.js";

// creating a tool 
const emailTool = tool(
  sendEmail,
  {
    name: "emailTool",
    description: "Send an email to the specified recipient.",
    schema: z.object({
      to: z.string().describe("The recipient's email address."),
      subject: z.string().describe("The subject of the email."),
      html: z.string().describe("The HTML content of the email."),
    }),
  }
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const model = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});


// creating an agent 
const agent = createAgent({
  model,
  tools: [emailTool]
})

const messages = [];

while (true) {
  const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");
  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({ messages });

  const lastMessage = response.messages[response.messages.length - 1];
  messages.push(lastMessage)
  console.log("\x1b[31mAI:\x1b[0m", lastMessage.content);
  // console.log(response.text)
}