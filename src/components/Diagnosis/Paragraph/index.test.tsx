import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ParagraphComponent from "./index";
import ShortTextComponent from "../ShortText";

describe("ParagraphComponent", () => {
  const title = "Please describe your experience:";
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear();
  });

  test("renders correctly with the given title", async () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} />);
    expect(screen.getByLabelText(title)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  test("updates input value on user typing", async () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "It was great!");

    expect(input).toHaveValue("It was great!");
  });

  test("calls onInputChange with the correct arguments when input changes", async () => {
    render(<ParagraphComponent title={title} onInputChange={mockOnInputChange} />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "Very enjoyable");

    expect(mockOnInputChange).toHaveBeenCalledTimes("Very enjoyable".length);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, "Very enjoyable");
  });

  test("displays error message when required field is not filled and user interacts", () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} required />);

    const input = screen.getByRole("textbox", { name: title });

    expect(screen.queryByText("This field is required")).not.toBeInTheDocument();

    userEvent.type(input, "Test");
    userEvent.clear(input);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
