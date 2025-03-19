"use client";

import { useEffect, useState } from 'react';
import { highlightCode } from './helpers';

export type CodeHighlighterProps = {
  text: string;
  language?: string;
  highlight?: string;
};

export function CodeHighlighter({ text, language = "javascript", highlight }: CodeHighlighterProps) {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  useEffect(() => {
    const getCode = async () => {
      const highlightedCode = await highlightCode(text, language, highlight);
      setHighlightedCode(highlightedCode);
    }

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

