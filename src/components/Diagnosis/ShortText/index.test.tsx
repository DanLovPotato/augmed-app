import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShortTextComponent from "./index";

describe("ShortTextComponent", () => {
  const title = "Your feedback:";
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear(); // Reset the mock function state before each test
  });

  test("renders correctly with the given title", () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} />);
    expect(screen.getByLabelText(title)).toBeInTheDocument();
  });

  test("updates input value on user typing", () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "Great experience!");
    expect(input).toHaveValue("Great experience!");
  });

  test("calls onInputChange with the correct arguments when input changes", () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "Very positive");
    expect(mockOnInputChange).toHaveBeenCalledTimes("Very positive".length); // Each character typed triggers the function
    expect(mockOnInputChange).toHaveBeenLastCalledWith(title, "Very positive");
  });
});
