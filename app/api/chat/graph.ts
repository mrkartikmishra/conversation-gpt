import { END, GraphNode, START, StateGraph } from "@langchain/langgraph";

import { MessagesState } from "./state";
import { SystemMessage } from "@langchain/core/messages";
import { getDynamicModel } from "./model";

export const llmCall: GraphNode<typeof MessagesState> = async (state) => {
  const llmModel = getDynamicModel("gemini-2.5-flash");

  const response = await llmModel.invoke([
    new SystemMessage("You are a helpful assistant."),
    ...state.messages,
  ]);
  return {
    messages: [response],
  };
};

export const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addEdge(START, "llmCall")
  .addEdge("llmCall", END)
  .compile();
