
import {
  transition,
  type Selection
} from "d3";

export type GraphNode = {
  name: string;
  id?: number;
  x?: number;
  y?: number;
  isHighlighted: boolean;
  isAwaiting: boolean;
  isResult: boolean;
}

export const GRAPH_CIRCLE_RADIUS = 16;

export const getGraphNode = (svg: Selection<null, unknown, null, undefined>, nodeData: GraphNode[]) => {
  const t = transition()
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
          .attr("class", "fill-green-500 stroke-black stroke-width-[1.5]")

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
        console.log("update", update)
        return update
          .classed("[&_circle]:stroke-red-500", (d) => d.isHighlighted)
          .classed("[&_circle]:fill-blue-500", (d) => d.isAwaiting)
          .classed("[&_circle]:fill-yellow-500", (d) => d.isResult)
      },
      (exit) => exit
        .remove()
    )


  return node;
}