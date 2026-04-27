import { Brackets, Network } from "lucide-react";


export const STEPS = {
  pushValue: "pushValue",
  popValue: "popValue",
  moveLastToTop: "moveLastToTop",
  movedLastToTop: "movedLastToTop",
  compareNodes: "compareNodes",
  swap: "swap",
  compareLeft: "compareLeft",
  compareRight: "compareRight",
  swapped: "swapped",
  startTraverse: "startTraverse",
  endTraverse: "endTraverse",
  peekValue: "peekValue",
}


export  const MODES = [
  { value: "array", label: "Array", icon: <Brackets className="h-4 w-4" /> },
  { value: "tree", label: "Tree", icon: <Network className="h-4 w-4 " /> },
];