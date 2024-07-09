import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SingleChoiceComponent from "./index";

describe("SingleChoiceComponent", () => {
  const title = "What is your favorite programming language?";
  const options = ["JavaScript", "Python", "C++"];
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear();
  });

  test("renders the title and options correctly", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value="" />);
    expect(screen.getByText(title)).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test("no option is checked initially when value is empty", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value="" />);
    options.forEach((option) => {
      expect(screen.getByTestId(option)).not.toBeChecked();
    });
  });

  test("correct option is checked according to the value prop", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value="Python" />);
    expect(screen.getByLabelText("Python")).toBeChecked();
  });

  test("calls onInputChange when an option is selected", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value="" />);
    const optionRadio = screen.getByTestId("JavaScript");
    fireEvent.click(optionRadio);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, "JavaScript");
  });

  test("ensures component does not call onInputChange if the same option is clicked", () => {
    render(
      <SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value="JavaScript" />,
    );
    const optionRadio = screen.getByTestId("JavaScript");
    fireEvent.click(optionRadio);
    expect(mockOnInputChange).not.toHaveBeenCalled();
  });
});
