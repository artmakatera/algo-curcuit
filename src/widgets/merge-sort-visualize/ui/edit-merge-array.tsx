import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import EditArrayItem from "@/features/visual-array/ui/edit-array-item";
import { MergeArrayWrapper } from "@/features/visual-merge-sort-array";

interface EditMergeArrayProps {
  array: number[];
  onRemoveNumber: (index: number) => void;
  onAddNumber: (value: number) => void;
  onUpdateNumber: (index: number, value: number) => void;
}

export const EditMergeArray = ({
  array,
  onRemoveNumber,
  onAddNumber,
  onUpdateNumber,
}: EditMergeArrayProps) => {
  return (
    <div className={"grid gap-8 pt-8"}>
      <MergeArrayWrapper>
        {array.map((value, index) => (
          <EditArrayItem
            key={index}
            value={value}
            index={index}
            onRemove={onRemoveNumber}
            onChange={onUpdateNumber}
          />
        ))}
        <Button
          className="ml-2 bg-green-500 hover:bg-green-600  dark:bg-green-600 dark:hover:bg-green-700"
          variant="destructive"
          size="icon"
          title="Add new value"
          onClick={() => onAddNumber(1)}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </MergeArrayWrapper>
    </div>
  );
};
