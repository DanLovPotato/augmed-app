import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ParagraphComponent from "./index";

describe("ParagraphComponent", () => {
  const title = "Please describe your experience:";
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear();
  });

  test("renders correctly with the given title", () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} />);
    expect(screen.getByLabelText(title)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  test("updates input value on user typing", () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "It was great!");
    expect(input).toHaveValue("It was great!");
  });

  test("calls onInputChange with the correct arguments when input changes", () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "Very enjoyable");
    expect(mockOnInputChange).toHaveBeenCalledTimes("Very enjoyable".length);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, "Very enjoyable");
  });
});
