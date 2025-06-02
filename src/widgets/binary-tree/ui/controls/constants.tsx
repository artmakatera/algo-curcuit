import { Plus, Search, Combine, Trash2 } from "lucide-react";

import { ControlsType } from "./types";
import { ActionType } from "../../model/types";

export const DEFAULT_TRAVERSE_TYPE = ActionType.bfs;

export const CONTROLS: ControlsType = [
  { label: "find", type: ActionType.find, color: "blue", Icon: <Search className="h-4 w-4" /> },
  { label: "delete", type: ActionType.delete, color: "red", Icon: <Trash2 className="h-4 w-4" /> },
  { label: "Add", type: ActionType.insert, color: "orange", Icon: <Plus className="h-4 w-4" /> },
  {
    label: "Traverse",
    type: DEFAULT_TRAVERSE_TYPE,
    color: "blue",
    Icon: <Combine className="h-4 w-4" />,
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

export const getControlByType = (type: ActionType) =>
  CONTROLS_BY_TYPE[type] || CONTROLS_BY_TYPE[DEFAULT_TRAVERSE_TYPE];
