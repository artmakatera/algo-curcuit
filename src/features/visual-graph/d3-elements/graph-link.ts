

import { cn } from "@/shared/lib/utils";
import { transition, easeLinear, type Selection } from "d3";
import { GraphNode } from "./graph-node";
import {
  GRAPH_LINK_GROUP_CLASSNAME,
  GRAPH_LINK_END_ARROW_CLASSNAME,
  GRAPH_LINK_LINE_CLASSNAME,
  GRAPH_VERTEX_CLASSNAME,
  GRAPH_LINK_START_ARROW_CLASSNAME
} from "./constants";

export type LinkData = {
  source: number | string | GraphNode;
  target: number | string | GraphNode;
  isHighlighted?: boolean;
  isAwaiting?: boolean;
  isResult?: boolean;
  id: string;
  endArrow?: boolean;
  startArrow?: boolean;
};

/**
 * Animation timing constants
 */
const ANIMATION_TIMING = {
  LINE_DELAY: 500,
  LINE_DURATION: 500,
  ARROW_DELAY: 1000,
  ARROW_DURATION: 200,
} as const;

/**
 * CSS classes for different link states
 */
const STATE_CLASSES = {
  highlighted: {
    stroke: "stroke-red-500",
    fill: "fill-red-500",
  },
  awaiting: {
    stroke: "stroke-blue-500",
    fill: "fill-blue-500",
  },
  result: {
    stroke: "stroke-yellow-500",
    fill: "fill-yellow-500",
  },
} as const;

export const getGraphLink = (svg: Selection<null, unknown, null, undefined>, data: LinkData[]) => {
  const linkGroups = svg
    .selectAll(`.${GRAPH_LINK_GROUP_CLASSNAME}`)
    .data(data, (d: any) => d.id)
    .join(
      (enter) => {
        const group = enter
          .insert("g", `.${GRAPH_VERTEX_CLASSNAME}`)
          .attr("class", GRAPH_LINK_GROUP_CLASSNAME);

        // Create and animate the line
        const line = group
          .append("line")
          .attr("class", cn(GRAPH_LINK_LINE_CLASSNAME, "stroke-foreground transition-stroke duration-500"))
          .attr("stroke-width", 1.5);

        line
          .attr("stroke-dasharray", "0, 100")
          .transition(transition()
            .delay(ANIMATION_TIMING.LINE_DELAY)
            .duration(ANIMATION_TIMING.LINE_DURATION)
            .ease(easeLinear)
          )
          .attr("stroke-dasharray", "100, 100");

        // Create and animate start arrow
        group
          .append("path")
          .attr("opacity", 0)
          .transition(transition()
            .delay(ANIMATION_TIMING.ARROW_DELAY)
            .duration(ANIMATION_TIMING.ARROW_DURATION)
          )
          .attr("opacity", d => d.startArrow ? 1 : 0)
          .attr("class", cn(GRAPH_LINK_START_ARROW_CLASSNAME, "fill-foreground transition-[fill] duration-500"))

        // Create and animate end arrow
        group
          .append("path")
          .attr("opacity", 0)
          .transition(transition()
            .delay(ANIMATION_TIMING.ARROW_DELAY)
            .duration(ANIMATION_TIMING.ARROW_DURATION)
          )
          .attr("opacity", d => d.endArrow ? 1 : 0)
          .attr("class", cn(GRAPH_LINK_END_ARROW_CLASSNAME, "fill-foreground transition-[fill] duration-500"))

        return group;
      },
      (update) => {
        // Update line colors based on state
        const lineSelection = update.select(`.${GRAPH_LINK_LINE_CLASSNAME}`);
        lineSelection
          .classed(STATE_CLASSES.highlighted.stroke, d => !!d.isHighlighted)
          .classed(STATE_CLASSES.awaiting.stroke, d => !!d.isAwaiting)
          .classed(STATE_CLASSES.result.stroke, d => !!d.isResult);

        // Update end arrow colors and visibility
        const endArrowSelection = update.select(`.${GRAPH_LINK_END_ARROW_CLASSNAME}`);
        endArrowSelection
          .attr("opacity", d => d.endArrow ? 1 : 0)
          .classed(STATE_CLASSES.highlighted.fill, d => !!d.isHighlighted)
          .classed(STATE_CLASSES.awaiting.fill, d => !!d.isAwaiting)
          .classed(STATE_CLASSES.result.fill, d => !!d.isResult);

        // Update start arrow colors and visibility
        const startArrowSelection = update.select(`.${GRAPH_LINK_START_ARROW_CLASSNAME}`);
        startArrowSelection
          .attr("opacity", d => d.startArrow ? 1 : 0)
          .classed(STATE_CLASSES.highlighted.fill, d => !!d.isHighlighted)
          .classed(STATE_CLASSES.awaiting.fill, d => !!d.isAwaiting)
          .classed(STATE_CLASSES.result.fill, d => !!d.isResult);

        return update;
      },
      (exit) => exit.remove()
    );

  return linkGroups;
};
