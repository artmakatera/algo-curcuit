import { GraphEditorProps } from "@/features/visual-graph-editor/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AdjacencyList,
  AdjacencyMatrixTable,
} from "@/features/visual-graph-editor";

const GRAPH_VIEWS = [
  {
    type: "list",
    label: "Adjacency List",
  },
  {
    type: "matrix",
    label: "Adjacency Matrix",
  },
];

export const GraphView = (props: GraphEditorProps) => {
  return (
    <Tabs defaultValue="matrix" className="w-fit max-w-xl mx-auto">
      <TabsList className="mx-auto">
        {GRAPH_VIEWS.map(({ type, label }) => {
          return (
            <TabsTrigger className="capitalize" key={type} value={type}>
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value={"list"}>
        <AdjacencyList {...props} />
      </TabsContent>
      <TabsContent value={"matrix"}>
        <AdjacencyMatrixTable {...props} />
      </TabsContent>
    </Tabs>
  );
};
