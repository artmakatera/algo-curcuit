import { Brackets, Network, ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";


export const STEPS = {
  pushValue: "pushValue",
  earlyReturn: "earlyReturn",
  earlyPop: "earlyPop",
  popValue: "popValue",
  moveLastToTop: "moveLastToTop",
  movedLastToTop: "movedLastToTop",
  compareNodes: "compareNodes",
  swap: "swap",
  compareLeft: "compareLeft",
  compareRight: "compareRight",
  swapped: "swapped",
  endSwapping: "endSwapping",
  startTraverse: "startTraverse",
  endTraverse: "endTraverse",
  peekValue: "peekValue",
}


export  const MODES = [
  { value: "array", label: "Array", icon: <Brackets className="h-4 w-4" /> },
  { value: "tree", label: "Tree", icon: <Network className="h-4 w-4 " /> },
];

export type HeapType = "min" | "max";

export const HEAP_TYPES = [
  {
    value: "min",
    label: "Min Heap",
    icon: <ArrowDownNarrowWide className="h-4 w-4" />,
  },
  {
    value: "max",
    label: "Max Heap",
    icon: <ArrowUpNarrowWide className="h-4 w-4" />,
  },
];