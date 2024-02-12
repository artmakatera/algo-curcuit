import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { VisualArrayWrapper } from "@/features/visual-array/ui/visual-array-wrapper";

test("BinarySearchPage", () => {
  render(<VisualArrayWrapper>Hi</VisualArrayWrapper>);
  expect(screen.getByText("Hi")).toBeInTheDocument();
});
