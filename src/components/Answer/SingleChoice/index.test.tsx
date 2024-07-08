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

  test("allows only one selection and reflects the change correctly", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value="" />);

    const pythonRadio = screen.getByLabelText("Python");
    fireEvent.click(pythonRadio);
    expect(pythonRadio).toBeChecked();

    const javascriptRadio = screen.getByLabelText("JavaScript");
    fireEvent.click(javascriptRadio);
    expect(javascriptRadio).toBeChecked();
    expect(pythonRadio).not.toBeChecked();
  });

  test("calls onInputChange with the correct arguments when an option is selected", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value="" />);

    const cppRadio = screen.getByLabelText("C++");
    fireEvent.click(cppRadio);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, "C++");

    const pythonRadio = screen.getByLabelText("Python");
    fireEvent.click(pythonRadio);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, "Python");

    expect(mockOnInputChange).toHaveBeenCalledTimes(2);
  });

  test("initializes with the correct value when provided", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value="Python" />);

    const pythonRadio = screen.getByLabelText("Python");
    expect(pythonRadio).toBeChecked();

    const javascriptRadio = screen.getByLabelText("JavaScript");
    expect(javascriptRadio).not.toBeChecked();

    const cppRadio = screen.getByLabelText("C++");
    expect(cppRadio).not.toBeChecked();
  });
});
