

import { cn } from "@/shared/lib/utils";
import { transition, easeLinear } from "d3";
import { GraphNode } from "./graph-node";
export type LinkData = {
  source: number | string | GraphNode;
  target: number | string | GraphNode;
  isHighlighted?: boolean;
  isAwaiting?: boolean;
  isResult?: boolean;
  id: string;
};

export const getGraphLink = (svg: d3.Selection<null, unknown, null, undefined>, data: LinkData[]) => {
  console.log("getGraphLink", data)
  return svg
    .selectAll(".link")
    .data(data, (d: any, i) => {
      return d.id
    })
    .join(
      (enter) => {
        const link = enter
          .insert("line", "g")
          .attr("class", cn("link stroke-foreground"))
          .attr("stroke-width", 1.5)

        link
          .attr("stroke-dasharray", "0, 100")
          .transition(transition().delay(500).duration(500).ease(easeLinear))
          .attr("stroke-dasharray", "100, 100")
          .attr("marker-end", "none")
          .transition()
          .attr("marker-end", "url(#d3-line-arrow)");

        return link

      },
      (update) => {
        return update
          .attr("class", d => cn("link stroke-foreground transition-stroke duration-500", {
            "stroke-red-500": d.isHighlighted,
            "stroke-blue-500": d.isAwaiting,
            "stroke-yellow-500": d.isResult,
          }))

      },
      (exit) => exit.remove()
    )


}
