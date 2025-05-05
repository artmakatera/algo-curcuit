
import * as d3 from "d3";

type GraphNode = {
  name: string;
  id?: number;
  x?: number;
  y?: number;
}

export const GRAPH_CIRCLE_RADIUS = 16;

export const getGraphNode = (svg: d3.Selection<null, unknown, null, undefined>, nodeData: GraphNode[]) => {
  const t = d3.transition()
    .duration(1000)
  const node = svg
    .selectAll("g")
    .data(nodeData, (d: any, i) => d.id)
    .join(
      (enter) => {
        const node = enter
          .append("g")
          .attr("transform", (d) => `translate(${d.x}, ${d.y})`)

        node
          .append("circle")
          .attr("stroke-width", 1.5)
          .classed("fill-green-500 stroke-black stroke-width-[1.5]", true)
          .attr("r", 0)
          .transition(t)
          .attr("r", GRAPH_CIRCLE_RADIUS)

        node
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "0.2em")
          .attr("fill", "white")
          .style("font-size", 14)
          .attr("transform", "scale(0.4)")
          .transition(t)
          .attr("transform", "scale(1)")
          .text((d) => d.name);



        return node


      },
      (update) => {
        return update
      },
      (exit) => exit.remove()
    )


  return node;
}