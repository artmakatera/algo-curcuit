export const ArrowMarker = () => {
  return (
    <defs>
      <marker
        id="arrowHead"
        orient="auto"
        markerWidth="3"
        markerHeight="4"
        refX="0.1"
        refY="2"
      >
        <path d="M0,0 V4 L2,2 Z" fill="black" />
        {/* <polygon points="0 0, 10 3.5, 0 7" /> */}
      </marker>
    </defs>
  );
};
