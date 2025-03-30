import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";

export function getIsCompletedNode(node: TreeNode, resultNodes: TreeNode[]) {
  return resultNodes.some((n) => n.id === node.id);
}

export function getIsFoundNode(node: TreeNode, foundNode?: TreeNode | null) {
  return foundNode?.id === node.id;
}

export function getIsNodeInserted(node: TreeNode, insertedNode?: TreeNode | null) {
  return insertedNode?.id === node.id;
}

export function getIsQueueNode(
  node: TreeNode,
  queueNodes?: TreeNode[],
  stackNodes?: TreeNode[]
) {
  if (Array.isArray(queueNodes) && queueNodes.length > 0) {
    return queueNodes.some((n) => n.id === node.id);
  }

  return getIsStackNode(node, stackNodes);
}

export function getIsActiveNodes(node: TreeNode, activeNode: TreeNode | null) {
  return activeNode?.id === node.id;
}

export function getIsStackNode(node: TreeNode, stackNodes?: TreeNode[]) {
  if (Array.isArray(stackNodes) && stackNodes.length > 0) {
    return stackNodes.some((n) => n.id === node.id);
  }

  return false;
}
