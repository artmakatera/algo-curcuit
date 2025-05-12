import { VertexBaseData } from "@/shared/types/data-structures";

export const getVertexName = (vertices: VertexBaseData[], index: number) => vertices[index]?.value;

/**
 * Determines if there's a connection between graph vertices based on adjacency matrix value
 * @param value - The value from the adjacency matrix
 * @returns Boolean indicating whether a graph edge exists
 */
export const hasGraphEdge = (value: number): boolean => value > 0;