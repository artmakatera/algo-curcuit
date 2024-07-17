"use client";
import { createContext, useState, ReactNode, useContext } from "react";
import { LANGUAGES } from "@/shared/constants/languages";

const CODE_LANG_KEY = "algo-code-lang";

export const CodeLangContext = createContext<
  [LANGUAGES, (lang: LANGUAGES) => void]
>([LANGUAGES.javascript, (_: LANGUAGES) => {}]);

export const CodeLangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(() => {
    const storedLang =
      typeof window !== "undefined"
        ? (localStorage.getItem(CODE_LANG_KEY) as LANGUAGES | null)
        : null;

    return storedLang || LANGUAGES.javascript;
  });

  return (
    <CodeLangContext.Provider value={[lang, setLang]}>
      {children}
    </CodeLangContext.Provider>
  );
};

export const useCodeLang = () => {
  const [lang = LANGUAGES.javascript, setLang] = useContext(CodeLangContext);
  const updateLanguage = (lang: string) => {
    setLang(lang as LANGUAGES);
    if (typeof window !== "undefined") {
      localStorage.setItem(CODE_LANG_KEY, lang);
    }
  };
  return [lang, updateLanguage] as const;
};
