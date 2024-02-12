import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import EditArrayItem, {
  EditArrayItemProps,
} from "@/features/visual-array/ui/edit-array-item";
import { useNumberArray } from "@/shared/hooks/useNumberArray";
import { describe, it } from "node:test";

const TestComponent = ({
  arr,
  min,
  max,
  children,
}: {
  arr: number[];
  min: number;
  max: number;
  children?: React.ReactNode;
}) => {
  const { array, updateNumber, removeNumber, addNumber } = useNumberArray(arr);

  return (
    <div id="test">
      {array.map((item, index) => (
        <EditArrayItem
          key={index}
          value={item}
          index={index}
          onChange={updateNumber}
          onRemove={removeNumber}
          min={min}
          max={max}
        />
      ))}
      <button type="button" data-testid="add" onClick={() => addNumber()}>
        Add
      </button>
    </div>
  );
};

describe("EditArrayItem", () => {
  test("It should render single input array update the number when the input value changes", () => {
    const { unmount } = render(<TestComponent arr={[1]} min={1} max={3} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("1");

    fireEvent.change(input, { target: { value: "2" } });
    expect(input).toHaveValue("2");

    fireEvent.change(input, { target: { value: "1" } });
    expect(input).toHaveValue("1");

    unmount();
  });

  test("It should not allow the number to go below the min value", () => {
    const { unmount } = render(<TestComponent arr={[1]} min={1} max={3} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("1");

    fireEvent.change(input, { target: { value: "-1" } });

    expect(input).toHaveValue("1");
    unmount();
  });

  test("It should not allow the number to go above the max value", () => {
    const { unmount } = render(<TestComponent arr={[1]} min={1} max={3} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("1");

    fireEvent.change(input, { target: { value: "5" } });

    expect(input).toHaveValue("3");
    unmount();
  });

  test("It should not add not number to the array", () => {
    const { unmount } = render(<TestComponent arr={[1]} min={1} max={3} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("1");

    fireEvent.change(input, { target: { value: "a" } });

    expect(input).toHaveValue("1");
    unmount();
  });

  test("It should update value on increment and decrement button click", () => {
    const { unmount } = render(<TestComponent arr={[1]} min={1} max={3} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("1");

    const add = screen.getByTestId("increment");
    fireEvent.click(add);
    expect(input).toHaveValue("2");

    const subtract = screen.getByTestId("decrement");
    fireEvent.click(subtract);
    expect(input).toHaveValue("1");
    unmount();
  });

  test("It should add and remove numbers", async () => {
    const { unmount } = render(<TestComponent arr={[1]} min={1} max={3} />);

    expect(screen.getAllByLabelText("edit array item")).toHaveLength(1);
    const add = screen.getByTestId("add");
    fireEvent.click(add);

    expect(screen.getAllByRole("textbox")).toHaveLength(2);

    let removeBtn = screen.getAllByTitle("Remove")[1];
    fireEvent.click(removeBtn);
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
    unmount();
  });
});
