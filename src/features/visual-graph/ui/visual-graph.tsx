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
  filter,
  SimulationLinkDatum,
} from "d3";

import { addDefsAndArrowMarker } from "@/shared/lib/d3/marker-helpers";
import {
  getGraphLink,
  getGraphNode,
  GraphNode,
  LinkData,
} from "../d3-elements";
import {
  AdjacencyMatrix,
  VertexBaseData,
} from "@/shared/types/data-structures";
import { transformAdjacencyMatrixToGraph } from "../model/transform-data";

// function clamp(x: number, lo: number, hi: number) {
//   return x < lo ? lo : x > hi ? hi : x;
// }

interface VisualGraphProps {
  adjacencyMatrix: AdjacencyMatrix;
  vertices: VertexBaseData[];
  highlightedNode?: number | null;
  sourceHighlightedNode?: number | null;
  awaitingNodes?: number[];
  resultNodes?: number[];
}

export const VisualGraph = ({
  adjacencyMatrix = [],
  vertices = [],
  highlightedNode,
  sourceHighlightedNode,
  awaitingNodes,
  resultNodes,
}: VisualGraphProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const graphData = transformAdjacencyMatrixToGraph(adjacencyMatrix, vertices, {
      highlightedNodeIndex: highlightedNode,
      awaitingNodeIndices: awaitingNodes,
      resultNodeIndices: resultNodes,
      sourceHighlightedNodeIndex: sourceHighlightedNode,
    });
    const svg = select(ref.current);
    const defs = addDefsAndArrowMarker(svg);
    const link = getGraphLink(svg, graphData.links);
    const node = getGraphNode(svg, graphData.nodes);
    const isTraversing =
      awaitingNodes?.length ||
      resultNodes?.length;

    const simulation = forceSimulation()
      .nodes(graphData.nodes as SimulationNodeDatum[])
      .force("charge", forceManyBody().distanceMax(50))
      .force("center", forceCenter(300, 100))
      .force(
        "link",
        forceLink(graphData.links as SimulationLinkDatum<SimulationNodeDatum>[])
          .id((d) => {
            console.log("link id", d);
            return vertices[d.index || 0].id;
          })
          .strength(1)
          .distance((link) => {
            const deltaIndexes = Math.abs(
              (link.source as SimulationNodeDatum).index! -
                (link.target as SimulationNodeDatum).index!
            );
            if (deltaIndexes < 3) {
              return 50;
            }
            return 100;
          })
          .iterations(10)
      )
      .force("collision", forceCollide(20).strength(1))
      .on("tick", tick);

    function tick() {
      const updateCoordinates =
        (directionKey: "source" | "target", coord: "x" | "y") =>
        (d: LinkData) => {
          const node = d[directionKey] as GraphNode;
          return node[coord] ?? 0;
        };

      if (isTraversing) return;

      link
        .attr("x1", updateCoordinates("source", "x"))
        .attr("y1", updateCoordinates("source", "y"))
        .attr("x2", updateCoordinates("target", "x"))
        .attr("y2", updateCoordinates("target", "y"));

      node.attr("transform", (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
    }

    return () => {
      simulation.stop();
      defs.remove();
    };
  }, [
    adjacencyMatrix,
    vertices,
    highlightedNode,
    awaitingNodes,
    resultNodes,
    sourceHighlightedNode,
  ]);

  return <Svg ref={ref} />;
};
