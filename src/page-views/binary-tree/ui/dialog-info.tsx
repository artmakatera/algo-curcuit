import { TypographyList, TypographyP } from "@/components/ui/typography";

export const DialogInfo = () => {
  return (
    <div>
      <TypographyP>
        A Binary Search Tree (BST) is a node-based binary tree data structure
        where each node has a key, and the tree satisfies the following
        properties:
      </TypographyP>
      <TypographyList>
        <li>
          The key in the left child (subtree) of a node is less than the key in
          its parent node.
        </li>
        <li>
          The key in the right child (subtree) of a node is greater than the key
          in its parent node.
        </li>
        <li>
          Both the left and right subtrees of every node are also binary search
          trees.
        </li>
      </TypographyList>
      <TypographyP>
        BSTs organize data in a hierarchical structure that allows for efficient
        searching, insertion, and deletion of elements.
      </TypographyP>

      <TypographyP>Pros:</TypographyP>
      <TypographyList>
        <li>
          <strong>Efficient Operations (Average Case):</strong> Provides
          relatively efficient searching, insertion, and deletion operations
          with an average time complexity of O(log n).
        </li>
        <li>
          <strong>Ordered Data:</strong> Maintains data in a sorted order, which
          can be useful for various applications.
        </li>
        <li>
          <strong>Dynamic Data Structure:</strong> Supports dynamic insertion
          and deletion of elements.
        </li>
      </TypographyList>
      <TypographyP>Cons:</TypographyP>
      <TypographyList>
        <li>
          <strong>Worst-Case Performance: </strong> Can have poor performance
          (O(n)) in the worst case when the tree becomes unbalanced (e.g.,
          inserting elements in sorted order).
        </li>
        <li>
          <strong>Not Inherently Balanced: </strong> Basic BSTs do not guarantee
          balance, requiring additional mechanisms (like AVL trees or red-black
          trees) to ensure efficient performance.
        </li>
        <li>
          <strong>More Complex Implementation: </strong> More complex to
          implement than standard binary search.
        </li>
      </TypographyList>
    </div>
  );
};
