/**
 * Utility functions for creating Safari-compatible arrows in D3 graphs
 */

import { GRAPH_CIRCLE_RADIUS } from "./constants";

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
interface ArrowPathParams {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  arrowSize?: number;
  nodeRadius?: number;
  startArrow?: boolean; // Optional, not used in this function but can be extended
}

export const createArrowPath = ({
  x1,
  y1,
  x2,
  y2,
  arrowSize = 8,
  nodeRadius = GRAPH_CIRCLE_RADIUS,
  startArrow = false, // Optional, not used in this function but can be extended
}: ArrowPathParams): string => {
  let angle = Math.atan2(y2 - y1, x2 - x1);
  const arrowLength = arrowSize;

  if (startArrow) {
    [x1, y1, x2, y2] = [x2, y2, x1, y1];
    angle += Math.PI; // Adjust angle for start arrow
    
  }

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