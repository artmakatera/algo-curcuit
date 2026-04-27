import { NodeArrayGroup } from "@/features/tree-view";
import { NodeToRemoveProvider } from "@/features/tree-view/context/node-to-remove-context";
import { ActionType, StepSnapshot } from "../../model/types";
import { cn } from "@/shared/lib/utils";
import React, { useMemo } from "react";
import { STEPS } from "../../model/constants";
import type { FloatingNodeState } from "@/features/tree-view/types";
import { getLeftChild, getRightChild } from "../../model/min-heap";
import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import {
  TreeArrayGroups,
  TreeArrayItem,
} from "@/widgets/binary-tree/model/types";

interface BinaryTreeViewProps {
  activeType: React.RefObject<ActionType | null>;
  currentSnapshot: StepSnapshot;
  delayRef: React.RefObject<string | null>;
}

export function BinaryTreeView(props: BinaryTreeViewProps) {
  const { activeType, currentSnapshot, delayRef } = props;

  const treeArray = useMemo(() => {
    const treeRoot = heapToTree(currentSnapshot.heap || []);
    return getTreeArray(false, treeRoot);
  }, [currentSnapshot.heap]);

  const groups = useMemo(() => {
    return getNodeGroups(treeArray);
  }, [treeArray]);

  console.log(currentSnapshot.heap, treeArray);

  const hasSwapIndexes = currentSnapshot.swapIndexes?.length >= 2;

  const isSwapStep = hasSwapIndexes && (
    currentSnapshot.type === STEPS.swap ||
    currentSnapshot.type === STEPS.swapLeft ||
    currentSnapshot.type === STEPS.swapRight);

  const swapNodes = useMemo(() => {
    if (!isSwapStep) return undefined;

    const [a, b] = currentSnapshot.swapIndexes;
    const parentIdx = Math.min(a, b);
    const childIdx = Math.max(a, b);

    const parentNode = treeArray[parentIdx]?.node;
    const childNode = treeArray[childIdx]?.node;

    if (!parentNode || !childNode) return undefined;

    return { parentId: parentNode.id, childId: childNode.id };
  }, [isSwapStep, currentSnapshot.swapIndexes, treeArray]);

  const isSwappedStep = currentSnapshot.type === STEPS.swapped;

  const floatingNodes = useMemo((): FloatingNodeState[] | null => {
    const { type, value, heap } = currentSnapshot;
    const activeT = activeType.current;

    if (activeT === ActionType.push) {
      if (type === STEPS.startTraverse) {
        return [{ value, key: `push-${value}`, label: "push" }];
      }
      if (type === STEPS.pushValue) {
        const target = `node-${heap.length - 1}`;
        return [{ value, key: `push-${value}`, animateToNodeId: target, hiddenNodeId: target, label: "push" }];
      }
    }

    if (activeT === ActionType.pop) {
      if (type === STEPS.popValue) {
        return [{ value, key: `pop-${value}`, initFromNodeId: "node-0", placeholderNodeId: "node-0", label: "popped" }];
      }
      if (type === STEPS.moveLastToTop) {
        const lastIdx = heap.length - 1;
        const lastValue = heap[lastIdx];
        return [
          { value, key: `pop-${value}`, label: "popped" },
          {
            value: lastValue,
            key: `pop-move-last-${lastValue}`,
            initFromNodeId: `node-${lastIdx}`,
            animateToNodeId: "node-0",
            hiddenNodeId: `node-${lastIdx}`,
            placeholderNodeId: "node-0",
          },
        ];
      }
      const popOngoingSteps: string[] = [
        STEPS.compareNodes,
        STEPS.swapLeft,
        STEPS.swapRight,
        STEPS.swap,
        STEPS.swapped,
        STEPS.endTraverse,
      ];
      if (popOngoingSteps.includes(type)) {
        return [{ value, key: `pop-${value}`, label: "popped" }];
      }
    }

    return null;
  }, [currentSnapshot, activeType]);

  return (
    <div className={cn("max-w-screen overflow-x-auto mt-20",)}>
      <div className="m-auto w-fit">
        <NodeArrayGroup
          activeType={activeType.current}
          parentKey={null}
          groups={groups}
          activeNode={treeArray[currentSnapshot.index]?.node || null}
          insertedNode={
           treeArray[currentSnapshot.index]?.node || null
          }
          swapNodes={swapNodes}
          preventNodeEdgeAnimation={isSwappedStep}
          foundNode={
            currentSnapshot.compareIndexes?.length > 0
              ? treeArray[currentSnapshot.compareIndexes[0]]?.node || null
              : null
          }
          floatingNodes={floatingNodes}
        />
      </div>
    </div>
  );
}

function getNodeGroups(treeArray: TreeArrayItem[]) {
  return treeArray.reduce((acc: TreeArrayGroups, item) => {
    const parentId = item.parent?.id || "null";
    acc[parentId] = acc[parentId] || [null, null];
    acc[parentId][item.isLeft ? 0 : 1] = structuredClone(item);
    return acc;
  }, {});
}

function getTreeArray(
  isLeft: boolean = false,
  node: TreeNode | null,
  parent: TreeNode | null = null,
  result: TreeArrayItem[] = [],
) {
  if (node === null) {
    return result;
  }

  const currentItem = {
    isLeft: isLeft,
    node: node,
    parent: parent ? parent : null,
  };

  result[getIndexFromId(node.id)] = currentItem;

  getTreeArray(true, node.left, node, result);
  getTreeArray(false, node.right, node, result);

  return result;
}

function heapToTree(heap: number[]) {
  if (heap.length === 0) {
    return null;
  }

  const root = new TreeNode(heap[0], getId(0));
  const nodes: (TreeNode | null)[] = [root];

  for (let i = 0; i < heap.length; i++) {
    const currentNode = nodes[i];
    if (!currentNode) continue;

    const leftIndex = getLeftChild(i);
    const rightIndex = getRightChild(i);

    if (leftIndex < heap.length) {
      const leftNode = new TreeNode(heap[leftIndex], getId(leftIndex));
      currentNode.left = leftNode;
      nodes[leftIndex] = leftNode;
    }

    if (rightIndex < heap.length) {
      const rightNode = new TreeNode(heap[rightIndex], getId(rightIndex));
      currentNode.right = rightNode;
      nodes[rightIndex] = rightNode;
    }
  }

  return root;
}


function getId(index: number) {
  return `node-${index}`;
}

function getIndexFromId(id: string) {
  return parseInt(id.split("-")[1], 10);
}
