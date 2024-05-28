import { motion } from "framer-motion";
import { Node } from "./node";
import { cn } from "@/shared/lib/utils";
import { Line } from "./line";
import { GAP_SIZE } from "../constants";
import { TreeArrayItem } from "@/widgets/binary-tree/model/types";
import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { AnimatePresence } from "framer-motion";
import { CollapseDiv } from "./collpase-div";
import { useRef } from "react";

const getLen = (childrenArr: TreeArrayItem[]) =>
  childrenArr?.filter(Boolean)?.length || 0;

type NodeArrayProps = {
  parentKey: any;
  groups: { [key: string]: TreeArrayItem[] };
  activeNode: TreeNode | null;
  insertedNode?: TreeNode | null;
  foundNode?: TreeNode | null;
  nodeToRemove?: TreeNode | null;
  minValueNode?: TreeNode | null;
  isRemoveSingleChild?: boolean;
  isParentToRemove?: boolean;
  parentRef?: React.RefObject<HTMLDivElement>;
  durationMs?: number;
  preventNodeEdgeAnimation?: boolean;
};

export const NodeArray = (props: NodeArrayProps) => {
  const { groups, parentKey } = props;

  return (
    <AnimatePresence>
      {groups[parentKey]?.map((item, index) => {
        return (
          <NodeArrayItem
            key={item?.node?.id || `index-{index}`}
            {...props}
            item={item}
            index={index}
          />
        );
      })}
    </AnimatePresence>
  );
};

function NodeArrayItem({
  item,
  index,
  ...props
}: NodeArrayProps & { item: TreeArrayItem; index: number }) {
  const {
    activeNode,
    groups,
    parentKey,
    insertedNode,
    foundNode,
    nodeToRemove,
    minValueNode,
    isRemoveSingleChild,
    isParentToRemove,
    parentRef,
    durationMs,
    preventNodeEdgeAnimation,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  if (!item)
    return <CollapseDiv key={`index-{index}`} className="w-10"></CollapseDiv>;
  const { node, isLeft } = item;

  const hasChildren = getLen(groups[node.id]) > 0;
  const isNodeToRemove = nodeToRemove?.id === node.id;
  const isMinNode = minValueNode?.id === node.id;
  const isSingleRemove = isNodeToRemove && isRemoveSingleChild;

  return (
    <CollapseDiv
      key={node.id}
      className={cn(`grid gap-${GAP_SIZE}`)}
      animate={
        isSingleRemove
          ? "singleChildRemove"
          : isParentToRemove
          ? "slideToParent"
          : "normal"
      }
      variants={getSlideToParentVariant(parentRef, wrapperRef, durationMs)}
      style={{
        gridArea: `item${index + 1}`,
        gridTemplateColumns: "repeat(2, minmax(40px, fit-content(100%)))",
        alignItems: "start",
        gridTemplateAreas: `
                    'header gap'
                    'item1 item2'
                  `,
      }}
    >
      <div
        className={cn("relative", !isLeft && "grid justify-end")}
        style={{
          gridColumn: isLeft ? "2 / -1" : undefined,
        }}
      >
        {parentKey !== null && !isMinNode && !isParentToRemove && (
          <Line
            className={cn(
              "h-12",
              isLeft ? "bottom-1/2 " : " bottom-1/2",
              hasChildren ? "w-full" : "w-1/2 left-1/2",
              !isLeft && !hasChildren && "w-1/2 left-0",
              "right-0"
            )}
            preventAnimation={preventNodeEdgeAnimation}
            isLeft={isLeft}
          />
        )}
        <div
          ref={wrapperRef}
          className={cn(
            "relative w-fit",
            hasChildren && `${isLeft ? "-" : ""}translate-x-1/2`
          )}
        >
          <Node
            current={node}
            active={activeNode?.id === node.id}
            inserted={insertedNode?.id === node.id}
            found={foundNode?.id === node.id}
            isNodeToRemove={isNodeToRemove}
            isMinValueNode={isMinNode}
            preventAnimation={preventNodeEdgeAnimation}
          />
        </div>
      </div>
      <NodeArray
        {...props}
        parentKey={node.id}
        isParentToRemove={isSingleRemove}
        parentRef={wrapperRef}
      />
    </CollapseDiv>
  );
}

function getSlideToParentVariant(
  parentRef?: React.RefObject<HTMLDivElement>,
  ref?: React.RefObject<HTMLDivElement>,
  durationMs: number = 750
) {
  if (!parentRef || !ref) return undefined;
  const parentRect = parentRef.current?.getBoundingClientRect();
  const rect = ref.current?.getBoundingClientRect();

  const { width: currentWidth } =
    ref.current?.parentElement?.getBoundingClientRect() || { width: 0 };
  if (!parentRect || !rect) return undefined;
  const x = parentRect.x - rect.x;
  const y = parentRect.y - rect.y;

  return {
    slideToParent: {
      x,
      y,

      transition: {
        duration: durationMs / 1000,
      },
    },
    singleChildRemove: {
      paddingLeft: currentWidth / 2,
    },
  };
}
