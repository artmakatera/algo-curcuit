import { TypographyH1 } from "@/components/ui/typography";
import { DescriptionDialog } from "@/features/description-dialog";
import { GraphVisualize } from "@/widgets/graph-visualize";
import { DialogInfo } from "./dialog-info";

export const GraphPage = () => {
  return (
    <main className="flex flex-col sm:px-24 py-10">
      <TypographyH1 className="self-center">Graph</TypographyH1>
      <GraphVisualize />
      <DescriptionDialog title="Graph">
        <DialogInfo />
      </DescriptionDialog>
    </main>
  );
};
