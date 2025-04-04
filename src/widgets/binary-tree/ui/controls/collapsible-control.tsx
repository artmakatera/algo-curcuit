import { isTraverseType } from "./helpers";
import { InputCollapsibleControl } from "./input-collapsible-control";
import { TraverseCollapsibleControl } from "./traverse-collapsible-control";
import { CollapsibleControlProps } from "./types";

export const CollapsibleControl = ({
  type,
  onTypeChange,
  ...props
}: CollapsibleControlProps) => {
  if (isTraverseType(type)) {
    return <TraverseCollapsibleControl type={type} onTypeChange={onTypeChange} {...props} />;
  }

  return <InputCollapsibleControl type={type} {...props} />;
};
