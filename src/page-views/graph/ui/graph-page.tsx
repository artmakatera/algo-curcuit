import { TypographyH1 } from "@/components/ui/typography";
import { GraphVisualize } from "@/widgets/graph-visualize";

export const GraphPage = () => {
  return (
    <main className="flex flex-col sm:px-24 py-10">
      <TypographyH1 className="self-center">Graph</TypographyH1>
      <GraphVisualize />
    </main>
  );
};
