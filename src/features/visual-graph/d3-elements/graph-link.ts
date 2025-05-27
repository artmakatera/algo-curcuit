

import { cn } from "@/shared/lib/utils";
import { transition, easeLinear } from "d3";
import { GraphNode } from "./graph-node";

import { GRAPH_LINK_GROUP_CLASSNAME, GRAPH_LINK_END_ARROW_CLASSNAME, GRAPH_LINK_LINE_CLASSNAME, GRAPH_VERTEX_CLASSNAME, GRAPH_LINK_START_ARROW_CLASSNAME } from "./constants";

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

export const getGraphLink = (svg: d3.Selection<null, unknown, null, undefined>, data: LinkData[]) => {
  // Create a group for each link to contain both line and arrow
  const linkGroups = svg
    .selectAll(`.${GRAPH_LINK_GROUP_CLASSNAME}`)
    .data(data, (d: any) => d.id)
    .join(
      (enter) => {
        const group = enter
          .insert("g", `.${GRAPH_VERTEX_CLASSNAME}`)
          .attr("class", GRAPH_LINK_GROUP_CLASSNAME);

        // Add the line
        const line = group
          .append("line")
          .attr("class", cn(GRAPH_LINK_LINE_CLASSNAME, "stroke-foreground transition-stroke duration-500"))
          .attr("stroke-width", 1.5);
        // Animate the line drawing
        line
          .attr("stroke-dasharray", "0, 100")
          .transition(transition().delay(500).duration(500).ease(easeLinear))
          .attr("stroke-dasharray", "100, 100");

        // Add the start arrow
        group
          .append("path")
          .attr("opacity", 0)
          .transition(transition().delay(1000).duration(200))
          .attr("opacity", d => d.startArrow ? 1 : 0)
          .attr("class", cn(GRAPH_LINK_START_ARROW_CLASSNAME, "fill-foreground transition-fill duration-500"));

        // Add the end arrow
        group
          .append("path")
          .attr("opacity", 0)
          .transition(transition().delay(1000).duration(200))
          .attr("opacity", d => d.endArrow ? 1 : 0)
          .attr("class", cn(GRAPH_LINK_END_ARROW_CLASSNAME, "fill-foreground transition-fill duration-500"));

        return group;
      },
      (update) => {
        // Update line colors based on state
        update.select(`.${GRAPH_LINK_LINE_CLASSNAME}`)
          .classed("stroke-red-500", d => !!d.isHighlighted)
          .classed("stroke-blue-500", d => !!d.isAwaiting)
          .classed("stroke-yellow-500", d => !!d.isResult);

        // Update arrow colors to match line
        update.select(`.${GRAPH_LINK_END_ARROW_CLASSNAME}`)
          .attr("opacity", d => d.endArrow ? 1 : 0)
          .classed("fill-red-500", d => !!d.isHighlighted)
          .classed("fill-blue-500", d => !!d.isAwaiting)
          .classed("fill-yellow-500", d => !!d.isResult);

        update.select(`.${GRAPH_LINK_START_ARROW_CLASSNAME}`)
          .attr("opacity", d => d.startArrow ? 1 : 0)
          .classed("fill-red-500", d => !!d.isHighlighted)
          .classed("fill-blue-500", d => !!d.isAwaiting)
          .classed("fill-yellow-500", d => !!d.isResult);

        return update;
      },
      (exit) => exit.remove()
    );

  return linkGroups;
}
