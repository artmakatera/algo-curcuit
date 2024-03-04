import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { VisualSortArrayAnimated } from "@/features/visual-sort-array-animated";

describe("VisualSortArrayAnimated", () => {
  const arrToSort = [99, 4, 122, 555, 2, 1, 3, 5, 6, 8];
  test("It should render in view mode", () => {
    const { unmount } = render(
      <VisualSortArrayAnimated
        arrToSort={arrToSort}
        compareIndexes={[]}
        swapIndexes={[]}
        editMode={false}
        onRemoveNumber={() => {}}
        onAddNumber={() => {}}
        onUpdateNumber={() => {}}
      />
    );

    unmount();
  });

  test("It should render in edit mode", () => {
    const { unmount } = render(
      <VisualSortArrayAnimated
        arrToSort={arrToSort}
        compareIndexes={[]}
        swapIndexes={[]}
        editMode
        onRemoveNumber={() => {}}
        onAddNumber={() => {}}
        onUpdateNumber={() => {}}
      />
    );

    unmount();
  });

  test("It should render with compareIndexes", () => {
    const { unmount } = render(
      <VisualSortArrayAnimated
        arrToSort={arrToSort}
        compareIndexes={[1, 2]}
        swapIndexes={[]}
        editMode={false}
        onRemoveNumber={() => {}}
        onAddNumber={() => {}}
        onUpdateNumber={() => {}}
      />
    );

    unmount();
  });

  test("It should render with swapIndexes", () => {
    const { unmount, rerender } = render(
      <VisualSortArrayAnimated
        arrToSort={arrToSort}
        compareIndexes={[]}
        swapIndexes={[1, 2]}
        editMode={false}
        onRemoveNumber={() => {}}
        onAddNumber={() => {}}
        onUpdateNumber={() => {}}
      />
    );

    expect(screen.getByText(122).closest("div")).toHaveClass("bg-red-500");
    expect(screen.getByText(4).closest("div")).toHaveClass("bg-red-500");

    rerender(
      <VisualSortArrayAnimated
        arrToSort={arrToSort}
        compareIndexes={[]}
        swapIndexes={[]}
        editMode={false}
        onRemoveNumber={() => {}}
        onAddNumber={() => {}}
        onUpdateNumber={() => {}}
      />
    );

    expect(screen.getByText(122).closest("div")).not.toHaveClass("bg-red-500");
    expect(screen.getByText(4).closest("div")).not.toHaveClass("bg-red-500");

    unmount();
  });
});
