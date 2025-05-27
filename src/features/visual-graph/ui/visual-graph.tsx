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
  SimulationLinkDatum,
} from "d3";

import {
  getGraphLink,
  getGraphNode,
  GraphNode,
  createArrowPath,
  GRAPH_LINK_LINE_CLASSNAME,
  GRAPH_LINK_GROUP_CLASSNAME,
  GRAPH_LINK_END_ARROW_CLASSNAME,
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
  isUndirected?: boolean;
  isLoop?: boolean;
}

export const VisualGraph = ({
  adjacencyMatrix = [],
  vertices = [],
  highlightedNode,
  sourceHighlightedNode,
  awaitingNodes,
  resultNodes,
  isUndirected,
  isLoop,
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
      if (isTraversing) return;

      // Update link groups with new positions for both lines and arrows
      link.each(function(d: any) {
        const group = select(this);
        const source = d.source as GraphNode;
        const target = d.target as GraphNode;
        
        if (source.x !== undefined && source.y !== undefined && 
            target.x !== undefined && target.y !== undefined) {
          // Update line position
          group.select(`.${GRAPH_LINK_LINE_CLASSNAME}`)
            .attr("x1", source.x)
            .attr("y1", source.y)
            .attr("x2", target.x)
            .attr("y2", target.y);
            
          
          // Update arrow position and shape
          group.select(`.${GRAPH_LINK_END_ARROW_CLASSNAME}`)
            .attr("d", createArrowPath(
              {
                x1: +source.x,
                y1: +source.y,
                x2: +target.x,
                y2: +target.y,
              }
            ))
        }
      });

      node.attr("transform", (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
    }

    return () => {
      simulation.stop();
    };
  }, [
    adjacencyMatrix,
    vertices,
    highlightedNode,
    awaitingNodes,
    resultNodes,
    sourceHighlightedNode,
    isUndirected,
    isLoop,
  ]);

  return <Svg ref={ref} />;
};
