export type VisualSortArrayAnimatedProps = {
  arrToSort: number[];
  compareIndexes: number[];
  swapIndexes: number[];
  sortedIndex?: number;
  indexToUpdate?: number;
  pivotIndex?: number;
  getIsSorted?: (index: number, sortedIndex: number) => boolean;
  editMode: boolean;
  onRemoveNumber: (index: number) => void;
  onAddNumber: (value: number) => void;
  onUpdateNumber: (index: number, value: number) => void;
};

export type AnimatedArrayItemProps = Omit<VisualSortArrayAnimatedProps,
  "arrToSort" |
  "editMode" |
  "onRemoveNumber" |
  "onAddNumber" |
  "onUpdateNumber"
> & {
  value: number;
  index: number;
  isSwapping: boolean;
  getIsSorted: (index: number, sortedIndex: number) => boolean;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
};