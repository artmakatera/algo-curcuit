import { motion } from "motion/react";
import { VisualArrayItem } from "@/features/visual-array/ui/visual-array-item";
import { ActionType, StepSnapshot } from "../../../model/types";
import { STEPS } from "../../../model/constants";

function getFloatNodeAnimation(
  currentSnapshot: StepSnapshot,
  lastItemRef: React.RefObject<HTMLDivElement | null>,
  firstItemRef: React.RefObject<HTMLDivElement | null>,
  floatNodeRef: React.RefObject<HTMLDivElement | null>,
  activeType: React.RefObject<ActionType | null>,
  isGoBack?: boolean,
) {
  const { type } = currentSnapshot;
  const floatNode = floatNodeRef.current;

  if (type === STEPS.pushValue && lastItemRef.current && floatNode) {
    const target = lastItemRef.current.getBoundingClientRect();
    const float = floatNode.getBoundingClientRect();

    if (isGoBack) {
      return {
        animKey: "push-go-back",
        initial: { x: target.left - float.left, y: target.top - float.top },
        animate: { x: 0, y: 0 },
      };
    }
    return {
      animKey: "push",
      initial: { x: 0, y: 0 },
      animate: { x: target.left - float.left, y: target.top - float.top },
    };
  }

  const isPopValueStep =
    type === STEPS.popValue || type === STEPS.startTraverse;

  if (
    activeType.current === ActionType.pop &&
    isPopValueStep &&
    firstItemRef.current &&
    floatNode
  ) {
    const source = firstItemRef.current.getBoundingClientRect();
    const float = floatNode.getBoundingClientRect();

    if (isGoBack) {
      return {
        animKey: "pop-go-back",
        initial: { x: 0, y: 0 },
        animate: { x: source.left - float.left, y: source.top - float.top },
      };
    }
    return {
      animKey: "pop",
      initial: { x: source.left - float.left, y: source.top - float.top },
      animate:
        type === STEPS.popValue
          ? { x: 0, y: 0 }
          : { x: source.left - float.left, y: source.top - float.top },
    };
  }

  return {
    animKey: "rest",
    initial: { x: 0, y: 0 },
    animate: { x: 0, y: 0 },
  };
}

export function FloatingNode({
  currentSnapshot,
  firstItemRef,
  lastItemRef,
  floatNodeRef,
  activeType,
  isGoBack,
}: {
  currentSnapshot: StepSnapshot;
  firstItemRef: React.RefObject<HTMLDivElement | null>;
  lastItemRef: React.RefObject<HTMLDivElement | null>;
  floatNodeRef: React.RefObject<HTMLDivElement | null>;
  activeType: React.RefObject<ActionType | null>;
  isGoBack?: boolean;
}) {
  const shouldShow =
    activeType.current === ActionType.pop ||
    activeType.current === ActionType.peek ||
    activeType.current === ActionType.push;

  const { animKey, initial, animate } = getFloatNodeAnimation(
    currentSnapshot,
    lastItemRef,
    firstItemRef,
    floatNodeRef,
    activeType,
    isGoBack,
  );

  if (!shouldShow) return null;

  return (
    <motion.div
      key={animKey}
      className="bg-background"
      initial={initial}
      animate={animate}
    >
      <VisualArrayItem value={currentSnapshot.value} index={-1} />
    </motion.div>
  );
}
