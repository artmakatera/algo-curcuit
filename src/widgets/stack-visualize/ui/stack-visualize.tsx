"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CounterInput } from "@/components/ui/counter-input";
import { StackView } from "@/features/visual-stack";
import { useNumberArray } from "@/shared/hooks/use-number-array";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { CodeViewers } from "@/components/ui/code-viewers";
import { languagesMapSettings } from "../model/languages-map-settings";
import { LANGUAGES } from "@/widgets/binary-search-visualize";
import { useCodeLang } from "@/shared/contexts/code-lang";

const defaultArray = [1, 2];

export const StackVisualize = () => {
  const [codeLang, setCodeLang] = useCodeLang();

  const { array, addNumber, removeNumber } = useNumberArray(
    defaultArray,
    0
  );
  const [valueToPush, setValueToPush] = useState<number>(1);
  const [showPeek, setShowPeek] = useState<boolean>(false);

  const handlePush = async () => {
    setShowPeek(false);
    addNumber(valueToPush);
  };

  const handlePop = async () => {
    setShowPeek(false);
    removeNumber(array.length - 1);
  };

  const handlePeek = () => {
    setShowPeek(true);
  };

  return (
    <div>
      <div className="mt-8 flex place-content-center items-center divide-x-2 mx-auto [&>div]:px-4">
        <div className="flex gap-4">
          <CounterInput
            min={0}
            max={100}
            value={valueToPush}
            onChange={setValueToPush}
          />
          <Button
            variant="destructive"
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            onClick={handlePush}
          >
            Push
          </Button>
        </div>

        <div>
          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={handlePop}
          >
            Pop
          </Button>
        </div>
        <div>
          <Button
            variant="destructive"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={handlePeek}
          >
            Peek
          </Button>
        </div>
      </div>
      <StackView array={array} showPeek={showPeek} />
         <div className="mt-12">
              <TypographyH3 className="mb-3 font-bold">Code:</TypographyH3>
              <CodeViewers
                langMap={languagesMapSettings}
                language={codeLang}
                onLanguageChange={(lang: string) => setCodeLang(lang as LANGUAGES)}
                step={0}
              />
            </div>
    </div>
  );
};
