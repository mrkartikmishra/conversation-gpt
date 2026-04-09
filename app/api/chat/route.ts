import { HumanMessage } from "@langchain/core/messages";
import { agent } from "./graph";

export async function POST(request: Request) {
  const result = await agent.invoke({
    messages: [new HumanMessage("hi, greet me. I am kartik Mishra")],
  });

  for (const message of result.messages) {
    console.log(`[${message.type}]: ${message.text}`);
  }
  return Response.json({ message: "OK" });
}
