import styles from './Home.module.scss';
import { useState } from "react";
import { SendQuestion } from "../../api_requests/SendQuestion.ts";
import './Home.scss'
import CustomSyntaxHighlighter from "../../components/CustomSyntaxHighlighter";

export interface IMessage {
  role: "user" | "assistant";
  message: string;
}

function auto_grow(type: boolean) {
  const element = document.getElementById("input");
  if(element) {
    element.style.height = "22px";
    if (!type) element.style.height = (element.scrollHeight - 20) + "px";
  }
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
    setQuestion("");
    auto_grow(true)
  };

  const form = document.getElementById('form');
  if(form) {
    form.addEventListener('submit', function(event) {
       event.preventDefault();
    });
  }

  return (
    <div className={styles.content}>
      <div className={styles.dialog} id="dialog">
        {history.map((answer, index) => (
          <CustomSyntaxHighlighter answer={answer} key={index} />
        ))}
        { loading && <div className={styles.loader}/> }
      </div>
      <form className={styles.input_container} id={'form'}>
        <textarea
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          className={styles.input}
          placeholder={"Введите запрос"}
          id={"input"}
          onInput={() => auto_grow(false)}
        />
        <button type={"submit"} className={styles.btn} onClick={handleSend}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Home;