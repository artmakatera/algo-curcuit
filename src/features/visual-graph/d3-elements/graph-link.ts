

import { cn } from "@/shared/lib/utils";
import { transition, easeLinear, select } from "d3";
import { GraphNode } from "./graph-node";
import { createArrowPath } from "@/shared/lib/d3/arrow-utils";

export type LinkData = {
  source: number | string | GraphNode;
  target: number | string | GraphNode;
  isHighlighted?: boolean;
  isAwaiting?: boolean;
  isResult?: boolean;
  id: string;
};

export const getGraphLink = (svg: d3.Selection<null, unknown, null, undefined>, data: LinkData[]) => {
  // Create a group for each link to contain both line and arrow
  const linkGroups = svg
    .selectAll(".link-group")
    .data(data, (d: any) => d.id)
    .join(
      (enter) => {
        const group = enter
          .append("g")
          .attr("class", "link-group");

        // Add the line
        const line = group
          .append("line")
          .attr("class", cn("link-line stroke-foreground"))
          .attr("stroke-width", 1.5);

        // Add the arrow path
        const arrow = group
          .append("path")
          .attr("class", cn("link-arrow fill-foreground"))
          .attr("opacity", 0);

        // Animate the line drawing
        line
          .attr("stroke-dasharray", "0, 100")
          .transition(transition().delay(500).duration(500).ease(easeLinear))
          .attr("stroke-dasharray", "100, 100");

        // Show arrow after line animation
        arrow
          .transition(transition().delay(1000).duration(200))
          .attr("opacity", 1);

        console.log("Link group created", group);

        return group;
      },
      (update) => {
        // Update line colors based on state
        update.select(".link-line")
          .attr("class", d => cn("link-line stroke-foreground transition-stroke duration-500", {
            "stroke-red-500": d.isHighlighted,
            "stroke-blue-500": d.isAwaiting,
            "stroke-yellow-500": d.isResult,
          }));

        // Update arrow colors to match line
        update.select(".link-arrow")
          .attr("class", d => cn("link-arrow fill-foreground transition-fill duration-500", {
            "fill-red-500": d.isHighlighted,
            "fill-blue-500": d.isAwaiting,
            "fill-yellow-500": d.isResult,
          }));

        return update;
      },
      (exit) => exit.remove()
    );

  // Update positions for both lines and arrows
  linkGroups.each(function (d: any) {
    const group = select(this);
    const source = d.source as GraphNode;
    const target = d.target as GraphNode;
    console.log(group)

    if (source.x !== undefined && source.y !== undefined &&
      target.x !== undefined && target.y !== undefined) {

      // Update line position
      group.select(".link-line")
        .attr("x1", source.x)
        .attr("y1", source.y)
        .attr("x2", target.x)
        .attr("y2", target.y);

      // Update arrow position and shape
      group.select(".link-arrow")
        .attr("d", createArrowPath(Number(source.x), Number(source.y), Number(target.x), Number(target.y)));
    }
  });

  return linkGroups;
}
