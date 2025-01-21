import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";


export const code = ` class BinaryTree {

  constructor() {
    this.root = null;
  }

}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [],
  [STEPS.addToQueue]: [],
  [STEPS.popFromQueue]: [],
  [STEPS.addToResult]: [],
  [STEPS.endTraverse]:[],

};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;