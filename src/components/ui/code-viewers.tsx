import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { CodeViewer, CodeViewerProps } from "./code-viewer";
import { Suspense } from "react";

type LangValue<T> = {
  code: string;
  highlightLines: Record<string, number[]>;
  language: T;
};

export type CodeViewersProps<T extends string> = Omit<
  CodeViewerProps,
  "text"
> & {
  langMap: { [key: string]: LangValue<T> };
  step: number;
  onLanguageChange?: (language: string) => void;
};

export const CodeViewers = <T extends string>({
  language,
  langMap,
  onLanguageChange,
  step,
}: CodeViewersProps<T>) => {
  const tabsEntries = Object.entries(langMap);

  if (tabsEntries.length === 0) {
    return null;
  }

  if (tabsEntries.length === 1) {
    const { code, language, highlightLines } = tabsEntries[0][1];
    return (
      <CodeViewer
        text={code}
        language={language as string}
        highlight={getHighlightLinesByStep(highlightLines, step)}
      />
    );
  }

  return (
      <Tabs
        className="shadow-md max-w-5xl text-sm"
        value={language}
        onValueChange={onLanguageChange}
      >
        <TabsList className="grid w-full grid-cols-2">
          {Object.keys(langMap).map((lang) => (
            <TabsTrigger key={lang} value={lang} className="capitalize">
              {lang}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsEntries.map(([value, { code, language, highlightLines }]) => (
          <TabsContent className="w-full" key={language + value} value={value}>
            <CodeViewer
              text={code}
              language={language as string}
              highlight={getHighlightLinesByStep(highlightLines, step)}
            />
          </TabsContent>
        ))}
      </Tabs>
  );
};

function getHighlightLinesByStep(
  highlightLines: Record<string, number[]>,
  step: number
) {
  const highlightArr = highlightLines[step.toString()] || [];
  return highlightArr.join(",");
}
