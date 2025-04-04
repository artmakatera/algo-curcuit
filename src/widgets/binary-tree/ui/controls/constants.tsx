import { Plus, Delete, Search, Combine } from "lucide-react";

import { ControlsType } from "./types";



export const CONTROLS: ControlsType = [
  { label: "find", type: "find", color: "blue", Icon: <Search /> },
  { label: "delete", type: "delete", color: "red", Icon: <Delete /> },
  { label: "Add", type: "insert", color: "orange", Icon: <Plus /> },
  { label: "Traverse", type: "bfs", color: "blue", Icon: <Combine /> },
  // { label: "Preorder", type: "dfs", color: "blue", Icon: <Combine /> },
];


export const CONTROLS_BY_TYPE: Record<string, ControlsType[number]> = CONTROLS.reduce(
  (acc, control) => {
    acc[control.type] = control;
    return acc;
  },
  {} as Record<string, ControlsType[number]>
);