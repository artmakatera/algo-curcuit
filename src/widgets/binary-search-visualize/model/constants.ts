export enum STEPS {
  start,
  started,
  middleIndex,
  ifStart,
  ifEnd,
  result,
  notFound,
  ifStartSorted,
  ifEndSorted,
  ifStartNotSorted,
  ifEndNotSorted,
}


export { LANGUAGES } from "@/shared/constants/languages";

export const DEFAULT_SORTED_ARRAY = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 30, 40, 50, 60, 70, 80, 90, 100,
];


export const DEFAULT_ROTATED_ARRAY = [
  20, 30, 40, 50, 60, 70, 80, 90, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];