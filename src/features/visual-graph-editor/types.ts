import { AdjacencyMatrix, VertexBaseData } from "@/shared/types/data-structures";


export type AddGraphVertex = (name?: string) => void;
export type UpdateGraphEdge = (from: number, to: number) => void;
export type RemoveGraphVertex = (index: number) => void;


export interface GraphEditorProps {
  adjacencyMatrix: AdjacencyMatrix;
  onAdd: AddGraphVertex;
  onToggle?: UpdateGraphEdge;
  onRemove?: RemoveGraphVertex;
  disableAdd?: boolean;
  vertices?: VertexBaseData[];
}