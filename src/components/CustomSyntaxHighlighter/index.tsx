import styles from '../../pages/Home/Home.module.scss'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {IMessage} from "../../pages/Home/Home.tsx";
import './CustomHighlighter.scss'

const CustomSyntaxHighlighter = ({ answer }: { answer: IMessage }) => {
  return (
    <div className="wrapper">
      <SyntaxHighlighter
              wrapLongLines
              wrapLines
              useInlineStyles
              language="javascript"
              className={styles.message}
            >
              {answer.message}
      </SyntaxHighlighter>
    </div>
  );
};

export default CustomSyntaxHighlighter;