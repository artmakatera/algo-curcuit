import { motion, type Transition } from "motion/react";
import { VisualArrayItem } from "@/features/visual-array/ui/visual-array-item";
import { ActionType, StepSnapshot } from "../../../model/types";
import { STEPS } from "../../../model/constants";

function getFloatNodeAnimation(
  currentSnapshot: StepSnapshot,
  lastItemRef: React.RefObject<HTMLDivElement | null>,
  firstItemRef: React.RefObject<HTMLDivElement | null>,
  floatNodeRef: React.RefObject<HTMLDivElement | null>,
  activeType: React.RefObject<ActionType | null>,
  animDuration: number,
  isGoBack?: boolean,
) {
  const { type } = currentSnapshot;
  const floatNode = floatNodeRef.current;
  const transition: Transition = { duration: animDuration, type: "tween", ease: "easeInOut" };

  if (type === STEPS.pushValue && lastItemRef.current && floatNode) {
    const target = lastItemRef.current.getBoundingClientRect();
    const float = floatNode.getBoundingClientRect();

    if (isGoBack) {
      return {
        animKey: "push-go-back",
        initial: { x: target.left - float.left, y: target.top - float.top },
        animate: { x: 0, y: 0 },
        transition,
      };
    }
    return {
      animKey: "push",
      initial: { x: 0, y: 0 },
      animate: { x: target.left - float.left, y: target.top - float.top },
      transition,
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
        transition,
      };
    }
    return {
      animKey: "pop",
      initial: { x: source.left - float.left, y: source.top - float.top },
      animate:
        type === STEPS.popValue
          ? { x: 0, y: 0 }
          : { x: source.left - float.left, y: source.top - float.top },
      transition,
    };
  }

  return {
    animKey: "rest",
    initial: { x: 0, y: 0 },
    animate: { x: 0, y: 0 },
    transition: { duration: 0 } as Transition,
  };
}

export function FloatingNode({
  currentSnapshot,
  firstItemRef,
  lastItemRef,
  floatNodeRef,
  activeType,
  isGoBack,
  animDuration,
}: {
  currentSnapshot: StepSnapshot;
  firstItemRef: React.RefObject<HTMLDivElement | null>;
  lastItemRef: React.RefObject<HTMLDivElement | null>;
  floatNodeRef: React.RefObject<HTMLDivElement | null>;
  activeType: React.RefObject<ActionType | null>;
  isGoBack?: boolean;
  animDuration: number;
}) {
  const shouldShow =
    activeType.current === ActionType.pop ||
    activeType.current === ActionType.peek ||
    activeType.current === ActionType.push;

  const { animKey, initial, animate, transition } = getFloatNodeAnimation(
    currentSnapshot,
    lastItemRef,
    firstItemRef,
    floatNodeRef,
    activeType,
    animDuration,
    isGoBack,
  );

  if (!shouldShow) return null;

  return (
    <motion.div
      key={animKey}
      className="bg-background"
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <VisualArrayItem value={currentSnapshot.value} index={-1} />
    </motion.div>
  );
}
