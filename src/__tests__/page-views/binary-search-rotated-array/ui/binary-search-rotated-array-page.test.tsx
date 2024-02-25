import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BinarySearchRotatedArrayPage } from "@/page-views/binary-search-rotated-array";

test("BinarySearchPage", () => {
  render(<BinarySearchRotatedArrayPage />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Binary Search Rotated Array",
    })
  ).toBeDefined();
});
