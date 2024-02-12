import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

import {
  BinarySearchVisualize,
  DEFAULT_SORTED_ARRAY,
} from "@/widgets/binary-search-visualize";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("BinarySearchVisualize", () => {
  test("It should update target", () => {
    const { unmount } = render(
      <BinarySearchVisualize defaultArray={DEFAULT_SORTED_ARRAY} />
    );
    const input = screen.getByLabelText("Target", { selector: "input" });

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(12);

    fireEvent.change(input, { target: { value: "2" } });

    expect(input).toHaveValue(2);

    unmount();
  });

  test("It should visualize on play button click", async () => {
    const { unmount } = render(
      <BinarySearchVisualize
        defaultArray={DEFAULT_SORTED_ARRAY}
        defaultSpeed="250"
      />
    );
    const playButton = screen.getByTitle("Start");

    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);

    await waitFor(() => {
      const items = screen.getAllByTestId("visual-array-item");
      expect(items[0]).toHaveClass("after:content-['→']");

      expect(items[items.length - 1]).toHaveClass("after:content-['←']");
      expect(items[1]).not.toHaveClass("after:content-['←']");
      expect(items[1]).not.toHaveClass("after:content-['→']");
    });
     expect(playButton.getAttribute("title")).toBe("Pause");

    await waitFor(
      () =>
        expect(screen.getAllByTestId("visual-array-item")[11]).toHaveClass(
          "bg-green-500"
        ),
      {
        timeout: 4000,
      }
    );
      await waitFor(() => expect(playButton.getAttribute("title")).toBe("Start"));

    unmount();
  });

  test("It should stop visualize on Click stop", async () => {
    const { unmount } = render(
      <BinarySearchVisualize defaultArray={DEFAULT_SORTED_ARRAY} />
    );
    const playButton = screen.getByTitle("Start");

    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);

    expect(playButton.getAttribute("title")).toBe("Pause");
    fireEvent.click(playButton);
    expect(playButton.getAttribute("title")).toBe("Start");
    await waitFor(
      () => {
        const items = screen.getAllByTestId("visual-array-item");
        expect(items[11]).not.toHaveClass("bg-green-500");
      },
      {
        timeout: 4000,
      }
    );

    unmount();
  });

  test("It should toggle edit mode", () => {

    const { unmount } = render(
      <BinarySearchVisualize defaultArray={DEFAULT_SORTED_ARRAY} />
    );
    const editButton = screen.getByTitle("Edit");

    expect(editButton).toBeInTheDocument();
    expect(screen.getByTestId("open-edit-icon")).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(screen.getByTestId("close-edit-icon")).toBeInTheDocument();

    

    unmount();
  });
});
