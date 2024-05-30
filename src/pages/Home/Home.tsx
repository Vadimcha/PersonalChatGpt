import styles from './Home.module.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {useState} from "react";
import {SendQuestion} from "../../api_requests/SendQuestion.ts";

export interface IMessage {
  role: "user" | "assistant";
  message: string;
}

const Home = () => {
  const [question, setQuestion] = useState<string>("")
  const [history, setHistory] = useState<IMessage[]>([])
  return (
    <div className={styles.content}>

      <div className={styles.dialog}>
        {history.map((answer, index) => (
          <SyntaxHighlighter
            useInlineStyles
            language="javascript"
            key={index}
            className={styles.message}
          >{answer.message}</SyntaxHighlighter>
        ))}
      </div>
      <div className={styles.input_container}>
        <input
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          className={styles.input}
          placeholder={"Введите запрос"}
        />
        <button onClick={() => {
          history.push({ role: "user", message: question })
          SendQuestion(question, history)
            .then(res =>
              setHistory(prevState => [...prevState, { role: "assistant", message: res }])
            )
        }}>Send
        </button>
      </div>

    </div>
  );
};

export default Home;
