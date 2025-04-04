import { ActionType } from "../../model/types";

export const isTraverseType = (type?: ActionType | null): boolean => !!type && type.includes("traverse");