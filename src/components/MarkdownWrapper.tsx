// @ts-ignore
import "github-markdown-css";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

type Props = {
  value: string;
};

export default function MarkdownWrapper(props: Props) {
  return (
    <div
      className="markdown-body"
      style={{ height: "100%", textAlign: "left" }}
    >
      <ReactMarkdown>{props.value}</ReactMarkdown>
    </div>
  );
}
