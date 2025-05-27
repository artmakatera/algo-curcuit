/**
 * Utility functions for creating Safari-compatible arrows in D3 graphs
 */

/**
 * Creates an SVG path string for an arrow at the end of a line
 * @param x1 - Start x coordinate
 * @param y1 - Start y coordinate
 * @param x2 - End x coordinate
 * @param y2 - End y coordinate
 * @param arrowSize - Size of the arrow (default: 8)
 * @param nodeRadius - Distance from target node center to arrow tip (default: 25)
 * @returns SVG path string for the arrow
 */
export const createArrowPath = (
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number, 
  arrowSize: number = 8,
  nodeRadius: number = 16
): string => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const arrowLength = arrowSize;
  
  // Calculate arrow tip position (slightly before the actual end to account for node radius)
  const tipX = x2 - Math.cos(angle) * nodeRadius;
  const tipY = y2 - Math.sin(angle) * nodeRadius;
  
  // Calculate arrow base points (30 degrees on each side)
  const baseX1 = tipX - Math.cos(angle - Math.PI / 6) * arrowLength;
  const baseY1 = tipY - Math.sin(angle - Math.PI / 6) * arrowLength;
  const baseX2 = tipX - Math.cos(angle + Math.PI / 6) * arrowLength;
  const baseY2 = tipY - Math.sin(angle + Math.PI / 6) * arrowLength;
  
  return `M${tipX},${tipY} L${baseX1},${baseY1} L${baseX2},${baseY2} Z`;
};