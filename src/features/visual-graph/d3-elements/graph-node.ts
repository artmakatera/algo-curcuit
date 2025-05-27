
import {

  transition,
  type Selection
} from "d3";

import { GRAPH_CIRCLE_RADIUS, GRAPH_VERTEX_CLASSNAME } from "./constants";
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


export const getGraphNode = (svg: Selection<null, unknown, null, undefined>, nodeData: GraphNode[]) => {
  const t = transition()
    .duration(1000)
  const node = svg
    .selectAll(`.${GRAPH_VERTEX_CLASSNAME}`)
    .data(nodeData, (d: any, i) => d.id)
    .join(
      (enter) => {
        const node = enter
          .append("g")
          .attr("class", GRAPH_VERTEX_CLASSNAME)
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

        const getLoopCoordinates = (deg: number = 45) => {
          const rad = deg * (Math.PI / 180);
          const x = GRAPH_CIRCLE_RADIUS * Math.cos(rad);
          const y = GRAPH_CIRCLE_RADIUS * Math.sin(rad);
          return [x, y]
        }

        const getLoopPath = (deg: number = 45) => {
          const [x, y] = getLoopCoordinates(deg);


          return `M ${-x} ${-y}
                    A ${GRAPH_CIRCLE_RADIUS} ${GRAPH_CIRCLE_RADIUS} 0 1 1 ${x} ${-y}
                    `;
        }


        // draw path that indicates self-loop (looks path reload page icon over circle)
        node
          .append("path")
          .attr("d", () => getLoopPath())
          .attr("class", "graph-loop-path stroke-foreground stroke-[1.5px] fill-none opacity-0 transition-opacity duration-500")
          .attr("transform", "scale(0.4)")
          .transition(t)
          .attr("transform", "scale(1)")


        node.append("path")
          .attr("d", () => {
            const [x, y] = getLoopCoordinates(45);
            return `M ${x} ${-y}
              L ${x + 7} ${-y - 3}
              L ${x} ${-y - 7}å
               Z`
          })
          .attr("class", "graph-loop-arrow fill-foreground opacity-0 transition-opacity duration-500")
          .attr("transform", "scale(0.4)")
          .transition(t)
          .attr("transform", "scale(1)")


        return node
      },
      (update) => {
        return update
          .attr("class", cn(GRAPH_VERTEX_CLASSNAME,"[&_circle]:transition-[stroke] [&_circle]:duration-600 [&_circle]:delay-500"))
          .classed("[&_circle]:stroke-red-500", (d) => d.isHighlighted)
          .classed("[&_circle]:fill-blue-500", (d) => d.isAwaiting)
          .classed("[&_circle]:fill-yellow-500", (d) => d.isResult)
          .classed("[&_path]:opacity-100", (d) => d.isLooped)
          .classed("[&_.graph-loop-arrow]:fill-blue-500 [&_.graph-loop-path]:stroke-blue-500", (d) => d.loopCheck)
          .classed("[&_.graph-loop-arrow]:fill-yellow-500 [&_.graph-loop-path]:stroke-yellow-500", (d) => d.loopResult)
      },
      (exit) => exit
        .remove()
    )


  return node;
}