import { LANGUAGES } from "../../constants";

import jsModel from "./js";
import javaModel from "./java";

/**
 * Maps language identifiers to their corresponding language models
 */
export const languagesMapSettings = {
  [LANGUAGES.javascript]: jsModel,
  [LANGUAGES.java]: javaModel,
};
