"use client";
import { CodeHighlighter } from "./code-highlighter";

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
    <div className="max-w-5xl text-sm">
      <CodeHighlighter text={text} language={language} highlight={highlight} />
    </div>
  );
};
