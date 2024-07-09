import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShortTextComponent from "./index";

describe("ShortTextComponent", () => {
  const title = "Your feedback:";
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear();
  });

  test("renders correctly with the given title", () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} value="" />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("calls onInputChange with the correct arguments when input changes", () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} value="" />);
    const input = screen.getByRole("textbox", { name: title });
    const testString = "Very positive";
    userEvent.type(input, testString);
    expect(mockOnInputChange).toHaveBeenCalledTimes(testString.length);
    expect(mockOnInputChange).toHaveBeenLastCalledWith(title, testString);
  });

  test("displays error message when required field is not filled and user interacts", () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} required value="" />);

    const input = screen.getByLabelText(`${title} *`);

    expect(screen.queryByText("This field is required")).not.toBeInTheDocument();

    userEvent.type(input, "Test");
    userEvent.clear(input);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
