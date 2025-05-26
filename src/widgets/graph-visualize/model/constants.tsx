import { Edit, GitBranch, Search } from "lucide-react";

export const STEPS = {
  start: "start",
  addStartNode: "addStartNode",
  addToStack: "addToStack",
  removeFromStack: "removeFromStack",
  addToQueue: "addToQueue",
  removeFromQueue: "removeFromQueue",
  addToResult: "addToResult",
  checkIfVisited: "checkIfVisited",
  end: "end",
} as const;

export const LANGUAGES = {
  javascript: "javascript",
  java: "java",
} as const;

export const MODES = [
  { value: "edit", label: "Edit", icon: <Edit className="h-4 w-4" /> },
  { value: "dfs", label: "DFS", icon: <GitBranch className="h-4 w-4" /> },
  { value: "bfs", label: "BFS", icon: <Search className="h-4 w-4" /> },
];

export type Mode = (typeof MODES)[number]["value"];
