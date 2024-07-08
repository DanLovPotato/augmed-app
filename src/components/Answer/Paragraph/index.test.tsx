import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ParagraphComponent from "./index";

describe("ParagraphComponent", () => {
  const title = "Please describe your experience:";
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear();
  });

  test("renders correctly with the given title", () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} value="" />);
    expect(screen.getByLabelText(title)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  test("initializes with the correct value when provided", () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} value="Initial value" />);
    const input = screen.getByLabelText(title);
    expect(input).toHaveValue("Initial value");
  });

  test("updates input value on user typing", async () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} value="" />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "It was great!");

    await waitFor(() => expect(input).toHaveValue("It was great!"));
  });

  test("calls onInputChange with the correct arguments when input changes", async () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} value="" />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "Very enjoyable");

    expect(mockOnInputChange).toHaveBeenCalledTimes("Very enjoyable".length);
    expect(mockOnInputChange).toHaveBeenLastCalledWith(title, "Very enjoyable");
  });

  test("displays error message when required field is not filled and user interacts", () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} required value="" />);

    const input = screen.getByLabelText(`${title} *`);

    expect(screen.queryByText("This field is required")).not.toBeInTheDocument();

    userEvent.type(input, "Test");
    userEvent.clear(input);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
