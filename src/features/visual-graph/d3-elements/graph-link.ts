

import { transition, easeLinear } from "d3";
export type LinkData = {
  source: number | string | { id: number | string };
  target: number | string | { id: number | string };
};

export const getGraphLink = (svg: d3.Selection<null, unknown, null, undefined>, data: LinkData[]) => {
  return svg
    .selectAll(".link")
    .data(data, (d: any, i) => {
      // let id = String(i);
      // if (typeof d.source === "number" && typeof d.target === "number") {
      //   id = d?.source + "-" + d?.target
      // }
      // else {
      //   id = d?.source.id + "-" + d?.target.id
      // }
      return d.id
    })
    .join(
      (enter) => {
        const link = enter
          .insert("line", "g")
          .attr("class", "link d3-svg-link")
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

          // .attr("stroke", "red")
      },
      (exit) => exit.remove()
    )


}
