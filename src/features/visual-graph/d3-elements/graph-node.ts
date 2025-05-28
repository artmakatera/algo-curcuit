
import {
  transition,
  type Selection
} from "d3";

import {
  GRAPH_CIRCLE_RADIUS,
  GRAPH_VERTEX_CLASSNAME,
  GRAPH_LOOP_PATH_CLASSNAME,
  GRAPH_LOOP_ARROW_CLASSNAME
} from "./constants";
import { cn } from "@/shared/lib/utils";

export type GraphNode = {
  name: string;
  id?: number;
  x?: number | string;
  y?: number | string;
  isHighlighted: boolean;
  isAwaiting: boolean;
  isResult: boolean;
  isLooped: boolean;
  loopCheck: boolean;
  loopResult: boolean;
}

/**
 * Get coordinates for loop elements at a given angle
 */
const getLoopCoordinates = (deg: number = 45) => {
  const rad = deg * (Math.PI / 180);
  const x = GRAPH_CIRCLE_RADIUS * Math.cos(rad);
  const y = GRAPH_CIRCLE_RADIUS * Math.sin(rad);
  return [x, y];
};

/**
 * Generate SVG path for self-loop arc
 */
const getLoopPath = () => {
  const [x, y] = getLoopCoordinates();
  return `M ${-x} ${-y}
          A ${GRAPH_CIRCLE_RADIUS} ${GRAPH_CIRCLE_RADIUS} 0 1 1 ${x} ${-y}`;
};

/**
 * Generate SVG path for loop arrow
 */
const getLoopArrowPath = () => {
  const [x, y] = getLoopCoordinates();
  return `M ${x} ${-y}
          L ${x + 7} ${-y - 3}
          L ${x} ${-y - 7}
          Z`;
};

const t = transition().duration(1000);

export const getGraphNode = (svg: Selection<null, unknown, null, undefined>, nodeData: GraphNode[]) => {

  const node = svg
    .selectAll(`.${GRAPH_VERTEX_CLASSNAME}`)
    .data(nodeData, (d: any) => d.id)
    .join(
      (enter) => {
        const nodeGroup = enter
          .append("g")
          .attr("class", GRAPH_VERTEX_CLASSNAME)
          .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

        // Add circle
        nodeGroup
          .append("circle")
          .attr("stroke-width", 1.5)
          .attr("class", "fill-green-500 stroke-black stroke-width-[1.5]")
          .attr("r", 0)
          .transition(t)
          .attr("r", GRAPH_CIRCLE_RADIUS);

        // Add text label
        nodeGroup
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "0.2em")
          .attr("fill", "white")
          .style("font-size", 14)
          .attr("transform", "scale(0.4)")
          .transition(t)
          .attr("transform", "scale(1)")
          .text((d) => d.name);

        // Add self-loop path
        nodeGroup
          .append("path")
          .attr("d", () => getLoopPath())
          .attr("class", `${GRAPH_LOOP_PATH_CLASSNAME} stroke-foreground stroke-[1.5px] fill-none  transition-opacity duration-500`)
          .attr("display", d => d.isLooped ? "block" : "none")
          .attr("transform", "scale(0.4)")
          .transition(t)
          .attr("transform", "scale(1)");

        // Add self-loop arrow
        nodeGroup
          .append("path")
          .attr("d", () => getLoopArrowPath())
          .attr("class", `${GRAPH_LOOP_ARROW_CLASSNAME} fill-foreground  transition-opacity duration-500`)
          .attr("display", d => d.isLooped ? "block" : "none")
          .attr("transform", "scale(0.4)")
          .transition(t)
          .attr("transform", "scale(1)");

        return nodeGroup;
      },
      (update) => {
        const updated = update
          .attr("class", cn(
            GRAPH_VERTEX_CLASSNAME,
            "[&_circle]:transition-[stroke] [&_circle]:duration-600 [&_circle]:delay-500"
          ))
          .classed("[&_circle]:stroke-red-500", (d) => d.isHighlighted)
          .classed("[&_circle]:fill-blue-500", (d) => d.isAwaiting)
          .classed("[&_circle]:fill-yellow-500", (d) => d.isResult)
          .classed(`[&_.${GRAPH_LOOP_ARROW_CLASSNAME}]:fill-blue-500 [&_.${GRAPH_LOOP_PATH_CLASSNAME}]:stroke-blue-500`, (d) => d.loopCheck)
          .classed(`[&_.${GRAPH_LOOP_ARROW_CLASSNAME}]:fill-yellow-500 [&_.${GRAPH_LOOP_PATH_CLASSNAME}]:stroke-yellow-500`, (d) => d.loopResult);


        updated
          .select(`.${GRAPH_LOOP_PATH_CLASSNAME}`)
          .attr("display", d => d.isLooped ? "block" : "none")
          .attr("opacity", 0)
          .attr("transform", "scale(1)")
          .transition()
          .attr("opacity", 1);

        updated
          .select(`.${GRAPH_LOOP_ARROW_CLASSNAME}`)
          .attr("display", d => d.isLooped ? "block" : "none")
          .attr("opacity", 0)
          .attr("transform", "scale(1)")
          .transition()
          .attr("opacity", 1);

        return updated
      },
      (exit) => exit
        .remove()
    )


  return node;
}