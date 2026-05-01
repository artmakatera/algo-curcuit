import type { StepSnapshot } from "../../../model/types";
import { ActionType } from "../../../model/types";
import { STEPS } from "../../../model/constants";
import { cn } from "@/shared/lib/utils";

function IxVal({ i, v }: { i: number; v: number }) {
  return (
    <span>
      <span className="font-semibold">{i}</span>
      <span className="text-muted-foreground">({v})</span>
    </span>
  );
}

function PushFormula({
  currentIndex,
  heap,
}: {
  currentIndex: number;
  heap: number[];
}) {
  const parentIdx = Math.floor((currentIndex - 1) / 2);
  return (
    <div className="space-y-1">
      <div>
        i = <IxVal i={currentIndex} v={heap[currentIndex]} />
      </div>
      <div>
        parent(<span className="font-semibold">i</span>) = (
        <span className="font-semibold">i</span> - 1) / 2 = (
        <span className="font-semibold">{currentIndex}</span> - 1) / 2 ={" "}
        <IxVal i={parentIdx} v={heap[parentIdx]} />
      </div>
    </div>
  );
}

function PopFormula({
  currentIndex,
  heap,
}: {
  currentIndex: number;
  heap: number[];
}) {
  const leftIdx = 2 * currentIndex + 1;
  const rightIdx = 2 * currentIndex + 2;
  const hasLeft = leftIdx < heap.length;
  const hasRight = rightIdx < heap.length;
  return (
    <div className="space-y-1">
      <div>
        i = <IxVal i={currentIndex} v={heap[currentIndex]} />
      </div>
      <div className="flex flex-wrap gap-x-4 min-h-5">
        {hasLeft && (
          <span>
            left = 2 * i + 1 = <IxVal i={leftIdx} v={heap[leftIdx]} />
          </span>
        )}
        {hasRight && (
          <span>
            right = 2 * i + 2 = <IxVal i={rightIdx} v={heap[rightIdx]} />
          </span>
        )}
      </div>
    </div>
  );
}

export function HeapifyFormula({
  currentSnapshot,
  activeType,
}: {
  currentSnapshot: StepSnapshot;
  activeType: React.RefObject<ActionType | null>;
}) {
  const { type, index: currentIndex, heap } = currentSnapshot;

  const isPushHeapifyStep =
    activeType.current === ActionType.push &&
    currentIndex > 0 &&
    (type === STEPS.compareNodes ||
      type === STEPS.swap ||
      type === STEPS.swapped);

  const isPopHeapifyStep =
    activeType.current === ActionType.pop &&
    (type === STEPS.compareNodes ||
      type === STEPS.compareLeft ||
      type === STEPS.compareRight ||
      type === STEPS.swap ||
      type === STEPS.swapped);

  return (
    <div
      className={cn(
        "mt-4 inline-block rounded-md border bg-muted/40 px-4 py-3 font-mono text-sm",
        !isPushHeapifyStep && !isPopHeapifyStep && "invisible",
      )}
    >
      {isPushHeapifyStep ? (
        <PushFormula currentIndex={currentIndex} heap={heap} />
      ) : (
        <PopFormula currentIndex={currentIndex} heap={heap} />
      )}
    </div>
  );
}
