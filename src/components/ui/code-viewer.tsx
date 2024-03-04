"use client";
import { useEffect, useRef } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

type CodeViewerProps = {
  text: string;
  language?: string;
  highlight?: string;
};

export const CodeViewer = ({
  text,
  language = "javascript",
  highlight,
}: CodeViewerProps) => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  if (!mounted.current) {
    return null;
  }

  return (
    <div className="shadow-md max-w-5xl">
      <CodeBlock
        text={text}
        codeContainerStyle={{ width: "500px", borderRadius: "25px" }}
        language={language}
        showLineNumbers
        theme={dracula}
        highlight={highlight}
      />
    </div>
  );
};
