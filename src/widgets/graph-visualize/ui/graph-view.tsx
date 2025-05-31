import { GraphEditorProps } from "@/features/visual-graph-editor/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AdjacencyList,
  AdjacencyMatrixTable,
} from "@/features/visual-graph-editor";
import { AlgorithmComplexity } from "@/features/algorithm-complexity";
import { COMPLEXITIES, Complexity } from "@/shared/constants/complexities";
import {
  CircleMinus,
  CirclePlus,
  GitPullRequestClosed,
  GitPullRequestCreate,
  Search,
} from "lucide-react";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { TypographyH2 } from "@/components/ui/typography";

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
        <GraphViewComplexity
          spaceComplexity={COMPLEXITIES.O_V_E}
          addVertexComplexity={COMPLEXITIES.O_1}
          removeVertexComplexity={COMPLEXITIES.O_V_E}
          addEdgeComplexity={COMPLEXITIES.O_1}
          removeEdgeComplexity={COMPLEXITIES.O_E}
          queryComplexity={COMPLEXITIES.O_V_E}
        />
      </TabsContent>
      <TabsContent value={"matrix"}>
        <AdjacencyMatrixTable {...props} />
        <GraphViewComplexity
          spaceComplexity={COMPLEXITIES.O_V_SQUARE}
          addVertexComplexity={COMPLEXITIES.O_V_SQUARE}
          removeVertexComplexity={COMPLEXITIES.O_V_SQUARE}
          addEdgeComplexity={COMPLEXITIES.O_1}
          removeEdgeComplexity={COMPLEXITIES.O_1}
          queryComplexity={COMPLEXITIES.O_1}
        />
      </TabsContent>
    </Tabs>
  );
};

interface GraphViewComplexityProps {
  spaceComplexity: Complexity;
  addVertexComplexity: Complexity;
  removeVertexComplexity: Complexity;
  addEdgeComplexity: Complexity;
  removeEdgeComplexity: Complexity;
  queryComplexity: Complexity;
}

function GraphViewComplexity({
  spaceComplexity,
  addVertexComplexity,
  removeVertexComplexity,
  addEdgeComplexity,
  removeEdgeComplexity,
  queryComplexity,
}: GraphViewComplexityProps) {
  return (
    <div className="pl-2 my-8">
      <TypographyH3>Algorithm Complexity</TypographyH3>
      <div className="flex gap-2 flex-wrap mt-2 mb-4 max-w-[340px]">
        <AlgorithmComplexity
          complexity={spaceComplexity}
          isSpaceComplexity
          badgeLabel="Storage"
        />
        <AlgorithmComplexity
          complexity={queryComplexity}
          icon={Search}
          badgeLabel="Query"
        />
        <AlgorithmComplexity
          complexity={addVertexComplexity}
          icon={CirclePlus}
          badgeLabel="Add Vertex"
        />
        <AlgorithmComplexity
          complexity={removeVertexComplexity}
          icon={CircleMinus}
          badgeLabel="Remove Vertex"
        />
        <AlgorithmComplexity
          complexity={addEdgeComplexity}
          icon={GitPullRequestCreate}
          badgeLabel="Add Edge"
        />
        <AlgorithmComplexity
          complexity={removeEdgeComplexity}
          icon={GitPullRequestClosed}
          badgeLabel="Remove Edge"
        />
      </div>
    </div>
  );
}
