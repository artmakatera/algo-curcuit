import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { TreeArrayGroups, TreeArrayItem } from "@/widgets/binary-tree/model/types";

/**
 * Convert a heap array into TreeNode objects and TreeArrayGroups
 * for rendering with NodeArrayGroup.
 *
 * Uses index-based stable IDs so the tree shape stays consistent.
 */
export function heapToTreeGroups(heap: number[]): {
  groups: TreeArrayGroups;
  nodes: TreeNode[];
} {
  if (heap.length === 0) return { groups: {}, nodes: [] };

  // Create TreeNode for each heap element with a stable index-based ID
  const nodes: TreeNode[] = heap.map((value, i) => {
    const node = new TreeNode(value);
    node.id = `heap-node-${i}`;
    return node;
  });

  // Link children
  for (let i = 0; i < nodes.length; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    if (leftIdx < nodes.length) nodes[i].left = nodes[leftIdx];
    if (rightIdx < nodes.length) nodes[i].right = nodes[rightIdx];
  }

  // Build TreeArrayGroups keyed by parent id
  const groups: TreeArrayGroups = {};

  // Root has parent "null"
  const rootItem: TreeArrayItem = {
    node: nodes[0],
    parent: null,
    isLeft: false,
  };
  groups["null"] = [rootItem, null as unknown as TreeArrayItem];

  for (let i = 0; i < nodes.length; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    const hasChildren = leftIdx < nodes.length || rightIdx < nodes.length;

    if (!hasChildren) continue;

    const children: (TreeArrayItem | null)[] = [null, null];

    if (leftIdx < nodes.length) {
      children[0] = { node: nodes[leftIdx], parent: nodes[i], isLeft: true };
    }
    if (rightIdx < nodes.length) {
      children[1] = { node: nodes[rightIdx], parent: nodes[i], isLeft: false };
    }

    groups[nodes[i].id] = children as TreeArrayItem[];
  }

  return { groups, nodes };
}
