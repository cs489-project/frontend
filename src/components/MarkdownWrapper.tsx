import "github-markdown-css";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

type Props = {
    value: string,
    maxHeight?: number,
}

export default function MarkdownWrapper(props: Props) {
    return <div className="markdown-body" style={{ height: props.maxHeight || 400, overflow: "auto", border: "1px solid black", textAlign: "left" }}>
        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {props.value}
        </ReactMarkdown>
    </div>
}
