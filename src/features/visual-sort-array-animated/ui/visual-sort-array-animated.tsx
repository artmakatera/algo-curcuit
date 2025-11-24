import { PlusIcon } from "@radix-ui/react-icons";

// Components
import {  VisualArrayWrapper } from "@/features/visual-array";
import EditArrayItem from "@/features/visual-array/ui/edit-array-item";
import { Button } from "@/components/ui/button";
import { VisualSortArrayAnimatedProps } from "./types";
import { AnimatedArrayItem } from "./animated-array-item";


export const VisualSortArrayAnimated = ({
  arrToSort,
  compareIndexes,
  swapIndexes,
  sortedIndex = -1,
  indexToUpdate = -1,
  pivotIndex = -1,
  getIsSorted = (index: number, sortedIndex: number) => index <= sortedIndex,
  editMode = false,
  onRemoveNumber,
  onAddNumber,
  onUpdateNumber,
}: VisualSortArrayAnimatedProps) => {
  if (editMode) {
    return (
      <VisualArrayWrapper>
        {arrToSort.map((value, index) => (
          <EditArrayItem
            key={index}
            value={value}
            index={index}
            onRemove={onRemoveNumber}
            onChange={onUpdateNumber}
          />
        ))}
        <Button
          className="ml-2 bg-green-500 hover:bg-green-600 "
          variant="destructive"
          size="icon"
          title="Add new value"
          onClick={() => onAddNumber(1)}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </VisualArrayWrapper>
    );
  }

  return (
      <VisualArrayWrapper>
        {arrToSort.map((value, index) => {
          const isSwapping = swapIndexes.some((i) => i === index);

          return (
            <AnimatedArrayItem
              key={index}
              value={value}
              index={index}
              compareIndexes={compareIndexes}
              isSwapping={isSwapping}
              sortedIndex={sortedIndex}
              indexToUpdate={indexToUpdate}
              pivotIndex={pivotIndex}
              getIsSorted={getIsSorted}
              swapIndexes={swapIndexes}
            />
          );
        })}
      </VisualArrayWrapper>
  );
};
