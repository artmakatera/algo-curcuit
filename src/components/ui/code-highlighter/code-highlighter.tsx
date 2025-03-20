"use client";

import { useEffect, useState } from "react";
import { highlightCode } from "./helpers";
import { flushSync } from "react-dom";

export type CodeHighlighterProps = {
  text: string;
  language?: string;
  highlight?: string;
};

export function CodeHighlighter({
  text,
  language = "javascript",
  highlight,
}: CodeHighlighterProps) {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  useEffect(() => {
    const getCode = async () => {
      const highlightedCode = await highlightCode(text, language, highlight);
      flushSync(() => {
        setHighlightedCode(highlightedCode);
      });
    };

    getCode();
  }, [text, language, highlight]);

  if (highlightedCode === null) {
    return null;
  }

  return (
    <section
      dangerouslySetInnerHTML={{
        __html: highlightedCode,
      }}
    />
  );
}
