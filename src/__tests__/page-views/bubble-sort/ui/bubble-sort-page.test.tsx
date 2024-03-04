import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BubbleSortPage } from "@/page-views/bubble-sort";

test("BinarySearchPage", () => {
  render(<BubbleSortPage />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Bubble Sort",
    })
  ).toBeDefined();
});
