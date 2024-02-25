import { expect, describe, test, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { VisualArrayItem } from "@/features/visual-array";

describe("VisualArrayItem", () => {
  afterEach(cleanup);

  test("should render", () => {
    render(<VisualArrayItem value={1} index={1} />);
    expect(screen.getByTestId("visual-array-item")).toBeDefined();
  });
  test("should render with className", () => {
    render(<VisualArrayItem value={1} index={1} className="test" />);
    expect(screen.getByTestId("visual-array-item")).toHaveClass("test");
  });
  test("should render with isComparing", () => {
    render(<VisualArrayItem value={1} index={1} isComparing />);
    expect(screen.getByTestId("visual-array-item")).toHaveClass("bg-blue-500");
  });

  test("should render pivot", () => {
    render(<VisualArrayItem value={1} index={1} isPivot />);
    expect(screen.getByText("Pivot")).toBeDefined();
  });
});
