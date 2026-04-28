import { LANGUAGES } from "@/shared/constants/languages";
import { ActionType } from "../types";
import { HeapType } from "../constants";

import jsMinPush from "./js/min-push";
import jsMinPop from "./js/min-pop";
import jsMinPeek from "./js/min-peek";
import jsMaxPush from "./js/max-push";
import jsMaxPop from "./js/max-pop";
import jsMaxPeek from "./js/max-peek";

type Model = {
  code: string;
  highlightLines: { [key: string]: number[] };
  language: LANGUAGES;
};

type LangMap = { [key in LANGUAGES]?: Model };

export const languagesMapSettings: Record<HeapType, Record<ActionType, LangMap>> = {
  min: {
    [ActionType.push]: { [LANGUAGES.javascript]: jsMinPush },
    [ActionType.pop]: { [LANGUAGES.javascript]: jsMinPop },
    [ActionType.peek]: { [LANGUAGES.javascript]: jsMinPeek },
  },
  max: {
    [ActionType.push]: { [LANGUAGES.javascript]: jsMaxPush },
    [ActionType.pop]: { [LANGUAGES.javascript]: jsMaxPop },
    [ActionType.peek]: { [LANGUAGES.javascript]: jsMaxPeek },
  },
};
