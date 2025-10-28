import { ArrowLeftRight, MoveRight, Workflow } from "lucide-react";

export const STEPS = {
  start: "start",
  movePointers: "movePointers",
  check: "checkCondition",
  found: "found",
  notFound: "notFound",
} as const;

export const LANGUAGES = {
  javascript: "javascript",
  java: "java",
} as const;



export const MODES = [
  { value: "inward", label: "Inward traversal", icon: <ArrowLeftRight className="h-4 w-4" /> },
  { value: "unidirectional", label: "Unidirectional traversal", icon: <MoveRight className="h-4 w-4" /> },
  { value: "fast-slow", label: "Fast/Slow pointers", icon: <Workflow className="h-4 w-4" /> },
];

export type Mode = (typeof MODES)[number]["value"];
