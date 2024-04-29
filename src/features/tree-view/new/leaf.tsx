import { ForwardedRef, forwardRef, useRef } from "react";

import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { Node } from "./node";
import { Line } from "./line";
import { cn } from "@/shared/lib/utils";

type LeafRef = ForwardedRef<HTMLDivElement>;

type ChildNodeProps = {
  node: TreeNode;
  isLeft?: boolean;
  childRef: LeafRef;
  isAnimating?: boolean;
};

const ChildNode = ({ node, isLeft, childRef, isAnimating }: ChildNodeProps) => {
  return (
    <>
      <Leaf
        node={node}
        ref={childRef}
        isLeft={isLeft}
        isAnimating={isAnimating}
      />
    </>
  );
};

export const Leaf = forwardRef(
  (
    {
      node,
      isLeft,
      isAnimating,
    }: { node: TreeNode; isLeft?: boolean; isAnimating?: boolean },
    parentRef: LeafRef
  ) => {
    const hasChildren = node.left || node.right;
    const childRef = useRef<HTMLDivElement>(null);
    const nodeElement = (
      <Node current={node} ref={childRef} active={isAnimating} />
    );
    return (
      <div className={cn("flex flex-col items-center", hasChildren && "pt-12")}>
        {!hasChildren && nodeElement}

        <div
          className="grid grid-flow-col"
          style={{
            gridTemplateColumns: "repeat(2, minmax(fit-content(100%)))",
          }}
        >
          {hasChildren ? (
            <>
              <div className="relative p-2 box-border min-w-14">
                {node.left && (
                  <ChildNode
                    node={node.left}
                    isLeft
                    childRef={childRef}
                    isAnimating={isAnimating}
                  />
                )}
                <div className="absolute -top-12 -right-6">{nodeElement}</div>
              </div>
              <div className="relative p-2 box-border min-w-14">
                {node.right && (
                  <ChildNode
                    node={node.right}
                    childRef={childRef}
                    isAnimating={isAnimating}
                  />
                )}
              </div>
            </>
          ) : null}
          {node.value === 60 && !isAnimating ? null : (
            <Line isLeft={isLeft} childRef={childRef} parentRef={parentRef} />
          )}
        </div>
      </div>
    );
  }
);

Leaf.displayName = "Leaf";
