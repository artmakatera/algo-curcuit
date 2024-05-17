import { CodeViewer, CodeViewerProps } from "@/components/ui/code-viewer";

type CodeSectionProps = CodeViewerProps & {};
export const CodeSection = ({ text, highlight }: CodeSectionProps) => {
  return <CodeViewer text={text} highlight={highlight} />;
};
