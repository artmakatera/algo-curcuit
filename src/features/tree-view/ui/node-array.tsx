import { TreeArrayItem } from "@/widgets/binary-tree/model/binary-tree";
import { Node } from "./node";
import { cn } from "@/shared/lib/utils";
import { Line } from "./line";
import { GAP_SIZE } from "../constants";

const getLen = (childrenArr: TreeArrayItem[]) =>
  childrenArr?.filter(Boolean)?.length || 0;

export const NodeArray = (props: {
  parentKey: any;
  groups: { [key: string]: TreeArrayItem[] };
}) => {
  const { parentKey, groups } = props;
  console.log(parentKey);

  return (
    groups[parentKey] &&
    groups[parentKey].map((item, index) => {
      if (!item) return <div className="w-10"></div>;
      const { node, isLeft } = item;

      const hasChildren = getLen(groups[node.id]) > 0;
      return (
        <div
          key={node.id}
          className={cn(`grid gap-${GAP_SIZE}`)}
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
            {parentKey !== null && (
              <Line
                className={cn(
                  "h-12",
                  isLeft ? "bottom-1/2 " : " bottom-1/2",
                  hasChildren ? "w-full" : "w-1/2 left-1/2",
                  !isLeft && !hasChildren && "w-1/2 left-0",
                  "right-0"
                )}
                isLeft={isLeft}
              />
            )}
            <div
              className={cn(
                "relative w-fit",
                hasChildren && `${isLeft ? "-" : ""}translate-x-1/2`
              )}
            >
              <Node current={node} />
            </div>
          </div>
          {/* {!isLeft && hasChildren && <div></div>} */}
          {hasChildren && <NodeArray parentKey={node.id} groups={groups} />}
        </div>
      );
    })
  );
};
