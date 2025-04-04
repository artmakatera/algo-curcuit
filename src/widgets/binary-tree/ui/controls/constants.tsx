import { Plus, Delete, Search, Combine } from "lucide-react";

import { ControlsType } from "./types";
import { ActionType } from "../../model/types";

export const DEFAULT_TRAVERSE_TYPE = ActionType.bfs;

export const CONTROLS: ControlsType = [
  { label: "find", type: ActionType.find, color: "blue", Icon: <Search /> },
  { label: "delete", type: ActionType.delete, color: "red", Icon: <Delete /> },
  { label: "Add", type: ActionType.insert, color: "orange", Icon: <Plus /> },
  {
    label: "Traverse",
    type: DEFAULT_TRAVERSE_TYPE,
    color: "blue",
    Icon: <Combine />,
    tabType: "traverse",
  },
];

export const TRAVERSE_OPTIONS = [
  {
    label: "Level Order",
    value: ActionType.bfs,
  },
  {
    label: "Preorder",
    value: ActionType.dfs,
  },
];

export const CONTROLS_BY_TYPE: Record<string, ControlsType[number]> =
  CONTROLS.reduce((acc, control) => {
    acc[control.type] = control;
    return acc;
  }, {} as Record<string, ControlsType[number]>);
