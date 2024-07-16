import { CodeBlock, dracula } from "react-code-blocks";

export type CodeViewerProps = {
  text: string;
  language?: string;
  highlight?: string;
};

export const CodeViewer = ({
  text,
  language = "javascript",
  highlight,
}: CodeViewerProps) => {
  return (
    <div className="shadow-md max-w-5xl text-sm">
      <CodeBlock
        text={text}
        codeContainerStyle={{
          width: "100%",
          borderRadius: "25px",
          fontSize: "0.8rem",
        }}
        language={language}
        showLineNumbers
        theme={dracula}
        highlight={highlight}
      />
    </div>
  );
};
