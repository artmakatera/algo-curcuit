

import { transition, easeLinear } from "d3";
export type LinkData = {
  source: number | { id: number | string };
  target: number | { id: number | string };
};

export const getGraphLink = (svg: d3.Selection<null, unknown, null, undefined>, data: LinkData[]) => {
  return svg
    .selectAll(".link")
    .data(data, (d: any, i) => {
      let id = String(i);
      if (typeof d.source === "number" && typeof d.target === "number") {
        id = d?.source + "-" + d?.target
      }
      else {
        id = d?.source.id + "-" + d?.target.id
      }
      return id
    })
    .join(
      (enter) => {
        const link = enter
          .insert("line", "g")
          .attr("class", "link")
          .attr("stroke-width", 1.5)
          .attr("stroke", "#000")


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

          // .attr("stroke", "red")
      },
      (exit) => exit.remove()
    )


}
