import { NodeArrayGroup } from "@/features/tree-view";
import { NodeToRemoveProvider } from "@/features/tree-view/context/node-to-remove-context";
import { ActionType, StepSnapshot } from "../../model/types";
import { cn } from "@/shared/lib/utils";
import React, { use, useMemo } from "react";
import { STEPS } from "../../model/constants";
import { getLeftChild, getRightChild } from "../../model/min-heap";
import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { TreeArrayGroups, TreeArrayItem } from "@/widgets/binary-tree/model/types";
import { get } from "http";

const heapToTree = (heap: number[]) => {
  if (heap.length === 0) {
    return null;
  }

  const root = new TreeNode(heap[0], `node-0`);
  const nodes: (TreeNode | null)[] = [root];

  for (let i = 0; i < heap.length; i++) {
    const currentNode = nodes[i];
    if (!currentNode) continue;

    const leftIndex = getLeftChild(i);
    const rightIndex = getRightChild(i);

    if (leftIndex < heap.length) {
      const leftNode = new TreeNode(heap[leftIndex], `node-${leftIndex}`);
      currentNode.left = leftNode;
      nodes[leftIndex] = leftNode;
    }

    if (rightIndex < heap.length) {
      const rightNode = new TreeNode(heap[rightIndex], `node-${rightIndex}`);
      currentNode.right = rightNode;
      nodes[rightIndex] = rightNode;
    }
  }

  return root;
};




interface BinaryTreeViewProps {
  activeType:  React.RefObject<ActionType | null>;
  currentSnapshot: StepSnapshot;
  delayRef: React.RefObject<string | null>;
}

export function BinaryTreeView(props: BinaryTreeViewProps) {
  const { activeType, currentSnapshot, delayRef } = props;

  const groups = useMemo(() => {
      let parentKey: string | null = null;


      const treeRoot = heapToTree(currentSnapshot.heap || []);

      return getNodeGroups(treeRoot);

  }, [currentSnapshot.heap]);

  console.log(groups)



  return <div className={cn("max-w-screen overflow-x-auto", !activeType && "mt-8")}>
          <div className="m-auto w-fit">
              <NodeArrayGroup
                activeType={activeType}
                parentKey={null}
                groups={groups}
              />
          </div>
        </div>
}


function getNodeGroups(root: TreeNode | null) {
  const groups: { [key: string]: TreeArrayItem[] } = {};
  const treeArray: TreeArrayItem[] = getTreeArray(false, root, null, []); 

  return treeArray.reduce((acc: TreeArrayGroups, item) => {
        const parentId = item.parent?.id || "null";
        acc[parentId] = acc[parentId] || [null, null];
        acc[parentId][item.isLeft ? 0 : 1] = structuredClone(item)
        return acc;
      }, {});
}


function getTreeArray(isLeft: boolean = false, node: TreeNode | null , parent: TreeNode | null = null, result: TreeArrayItem[] = []) {

    if (node === null) {
      return result;
    }

    result.push({
      isLeft: isLeft,
      node: node,
      parent: parent ? parent : null,
    });

    getTreeArray(true, node.left, node, result);
    getTreeArray(false, node.right, node, result);

    return result;
  }