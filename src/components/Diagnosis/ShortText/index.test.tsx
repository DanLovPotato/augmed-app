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

  test("renders correctly with the given title", async () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("updates input value on user typing", async () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "Great experience!");
    await screen.findByDisplayValue("Great experience!");
    expect(input).toHaveValue("Great experience!");
  });

  test("calls onInputChange with the correct arguments when input changes", async () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} />);
    const input = screen.getByLabelText(title);
    userEvent.type(input, "Very positive");
    expect(mockOnInputChange).toHaveBeenCalledTimes("Very positive".length);
    expect(mockOnInputChange).toHaveBeenLastCalledWith(title, "Very positive");
  });

  test("displays error message when required field is not filled and user interacts", () => {
    render(<ShortTextComponent title={title} onInputChange={mockOnInputChange} required />);

    const input = screen.getByLabelText(title);

    expect(screen.queryByText("This field is required")).not.toBeInTheDocument();

    userEvent.type(input, "Test");
    userEvent.clear(input);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
