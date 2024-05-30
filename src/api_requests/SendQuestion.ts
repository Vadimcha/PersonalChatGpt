import axios from "axios";
import {IMessage} from "../pages/Home/Home.tsx";

export const SendQuestion = async (question: string, history: IMessage[]) => {
  const response = await axios({
    method: "POST",
    url: "https://api.edenai.run/v2/text/chat",
    headers: {
      authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    data: {
      providers: "openai",
      text: question,
      chatbot_global_action: "Act as an assistant",
      previous_history: history,
      temperature: 0.0,
      max_tokens: 500,
    },
  }).then(res => {
    return res.data.openai.generated_text
  });
  return response;
}