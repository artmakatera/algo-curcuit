"use client";
import { Svg } from "@/components/ui/svg";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { SimulationNodeDatum } from "d3";

import { addDefsAndArrowMarker } from "@/shared/lib/d3/marker-helpers";
import { getGraphLink, getGraphNode } from "../d3-elements";
import { Button } from "@/components/ui/button";
import { AdjacencyMatrix } from "@/shared/types/data-structures";
import { getGraphFromAdjacencyMatrix } from "../model/transform-data";

function clamp(x: number, lo: number, hi: number) {
  return x < lo ? lo : x > hi ? hi : x;
}

interface VisualGraphProps {
  adjacencyMatrix: AdjacencyMatrix;
  verticesNames: string[];
}

export const VisualGraph = ({
  adjacencyMatrix = [],
  verticesNames = [],
}: VisualGraphProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const graphData = getGraphFromAdjacencyMatrix(
      adjacencyMatrix,
      verticesNames
    );
    const svg = d3.select(ref.current);
    const defs = addDefsAndArrowMarker(svg);
    const link = getGraphLink(svg, graphData.links);
    const node = getGraphNode(svg, graphData.nodes);

    const simulation = d3
      .forceSimulation()
      .nodes(graphData.nodes)
      .force("charge", d3.forceManyBody().distanceMax(70))
      .force("center", d3.forceCenter(300, 100))
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d) => {
            return verticesNames[d.index || 0];
          })
          .strength(1)
          .distance(link => 70)

          .iterations(10)
      )
      .on("tick", tick);

    function tick() {
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
  }, [adjacencyMatrix, verticesNames]);

  return <Svg ref={ref} />;
};
