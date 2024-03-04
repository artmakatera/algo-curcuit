import { useMemo } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

// Components
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import EditArrayItem from "@/features/visual-array/ui/edit-array-item";
import { Button } from "@/components/ui/button";

type VisualSortArrayAnimatedProps = {
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

const size = 48;

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
  const deltaPx = useMemo(
    () =>
      swapIndexes.length ? Math.abs(swapIndexes[0] - swapIndexes[1]) * size : 0,
    [swapIndexes]
  );

  const styleRender = useMemo(() => {
    return (
      <style jsx global>
        {`
          @keyframes go-back {
            0% {
              transform: translate(0, -${size}px);
            }
            50% {
              transform: translate(-${deltaPx}px, -${size}px);
            }
            100% {
              transform: translate(-${deltaPx}px, 0);
            }
          }

          @keyframes go-forward {
            0% {
              transform: translate(0, ${size}px);
            }
            50% {
              transform: translate(${deltaPx}px, ${size}px);
            }
            100% {
              transform: translate(${deltaPx}px, 0);
            }
          }
          .item-go-forward {
            animation: go-forward 0.5s ease-in-out;
            animation-fill-mode: forwards;
          }

          .item-go-back {
            animation: go-back 0.5s ease-in-out;
            animation-fill-mode: forwards;
          }
        `}
      </style>
    );
  }, [deltaPx]);

  if (editMode) {
    return (
      <VisualArrayWrapper>
        {arrToSort.map((value, index, arr) => (
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
    <>
      {styleRender}
      <VisualArrayWrapper>
        {arrToSort.map((value, index) => {
          const isSwapping = swapIndexes.some((i) => i === index);

          return (
            <VisualArrayItem
              key={index}
              value={value}
              index={index}
              isComparing={compareIndexes.some((i) => i === index)}
              isSwapping={isSwapping}
              isSorted={getIsSorted(index, sortedIndex)}
              currentSortItem={index === indexToUpdate}
              isGoBack={swapIndexes[1] === index}
              isGoForward={swapIndexes[0] === index}
              isPivot={index === pivotIndex}
            />
          );
        })}
      </VisualArrayWrapper>
      {/* <VisualArrayLegend legend={SORTED_ARRAY_LEGEND} /> */}
    </>
  );
};
