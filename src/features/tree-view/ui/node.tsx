export type Node = {
  value: number;
  x: number;
  y: number;
};

type NodeItemProps = Node & { r: number };

export const NodeItem = ({ value, x, y, r }: NodeItemProps) => {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={r}
        stroke="black"
        strokeWidth="0"
        fill="lightgreen"
      />
      <text x={x} y={y + 5} textAnchor="middle" fill="black" fontSize="20px">
        {value}
      </text>
    </>
  );
};
