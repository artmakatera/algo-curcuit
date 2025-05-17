"use client";
import { Svg } from "@/components/ui/svg";

import { useEffect, useRef } from "react";
import {
  select,
  forceCenter,
  forceCollide,
  forceSimulation,
  forceManyBody,
  forceLink,
  type SimulationNodeDatum,
} from "d3";

import { addDefsAndArrowMarker } from "@/shared/lib/d3/marker-helpers";
import { getGraphLink, getGraphNode, GraphNode } from "../d3-elements";
import {
  AdjacencyMatrix,
  VertexBaseData,
} from "@/shared/types/data-structures";
import { getGraphFromAdjacencyMatrix } from "../model/transform-data";

// function clamp(x: number, lo: number, hi: number) {
//   return x < lo ? lo : x > hi ? hi : x;
// }

interface VisualGraphProps {
  adjacencyMatrix: AdjacencyMatrix;
  vertices: VertexBaseData[];
  highlightedNode?: number | null;
  awaitingNodes?: number[];
  resultNodes?: number[];
}

export const VisualGraph = ({
  adjacencyMatrix = [],
  vertices = [],
  highlightedNode,
  awaitingNodes,
  resultNodes,
}: VisualGraphProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const graphData = getGraphFromAdjacencyMatrix(adjacencyMatrix, vertices, {
      highlightedNode,
      awaitingNodes,
      resultNodes,
    });
    const svg = select(ref.current);
    const defs = addDefsAndArrowMarker(svg);
    const link = getGraphLink(svg, graphData.links);
    const node = getGraphNode(svg, graphData.nodes);
    const isTraversing =
      typeof highlightedNode === "number" || awaitingNodes?.length || resultNodes?.length;

    const simulation = forceSimulation()
      .nodes(graphData.nodes)
      .force("charge", forceManyBody().distanceMax(50))
      .force("center", forceCenter(300, 100))
      .force(
        "link",
        forceLink(graphData.links)
          .id((d) => {
            return vertices[d.index || 0].id;
          })
          .strength(1)
          .distance((link) => {
            const deltaIndexes = Math.abs(
              (link.source as SimulationNodeDatum).index! -
                (link.target as SimulationNodeDatum).index!
            );
            // if (deltaIndexes < 3) {
            //   return 50;
            // }
            return 100;
          })
          .iterations(10)
      )
      .force("collision", forceCollide(20).strength(1))
      .on("tick", tick);

    function tick() {
      if (isTraversing) {
        return;
      }
      link
        // @ts-ignore
        .attr("x1", (d) => d.source.x)
        // @ts-ignore
        .attr("y1", (d) => d.source.y)
        // @ts-ignore
        .attr("x2", (d) => d.target.x)
        // @ts-ignore
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    }

    return () => {
      simulation.stop();
      defs.remove();
    };
  }, [adjacencyMatrix, vertices, highlightedNode, awaitingNodes, resultNodes]);

  return <Svg ref={ref} />;
};
