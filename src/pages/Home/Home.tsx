import styles from './Home.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useState } from "react";
import { SendQuestion } from "../../api_requests/SendQuestion.ts";
import './Home.scss'

export interface IMessage {
  role: "user" | "assistant";
  message: string;
}

const Home = () => {
  const [question, setQuestion] = useState<string>("");
  const [history, setHistory] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const send = () => {
    SendQuestion(question, history)
      .then(res => {
        setHistory(prevState => [...prevState, { role: "assistant", message: res }]);
        setLoading(false);
      });
  };

  const handleSend = () => {
    setLoading(true)
    setHistory(prevState => [...prevState, { role: "user", message: question }]);
    send();
    setQuestion(""); // Очистить поле ввода после отправки
  };

  return (
    <div className={styles.content}>
      <div className={styles.dialog} id="dialog">
        {history.map((answer, index) => (
          <SyntaxHighlighter
            wrapLongLines
            wrapLines
            useInlineStyles
            language="javascript"
            key={index}
            className={styles.message}
          >
            {answer.message}
          </SyntaxHighlighter>
        ))}
        { loading && <div className={styles.loader}/> }
      </div>
      <div className={styles.input_container}>
        <input
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          className={styles.input}
          placeholder={"Введите запрос"}
        />
        <button className={styles.btn} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Home;