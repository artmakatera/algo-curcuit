import { SVGLineElementAttributes } from "react";



export const Line = ({
  x1,
  y1,
  x2,
  y2,
  ...props
}: SVGLineElementAttributes<SVGLineElement>) => {
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="1"
        markerEnd="url(#arrowHead)"
        {...props}
      />
 
    </>
  );
};
