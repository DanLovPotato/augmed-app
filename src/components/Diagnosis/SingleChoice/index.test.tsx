import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SingleChoiceComponent from "./index";

describe("SingleChoiceComponent", () => {
  const title = "What is your favorite programming language?";
  const options = ["JavaScript", "Python", "C++"];
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear(); // Reset the mock function state before each test
  });

  test("renders the title and options correctly", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test("allows only one selection and reflects the change correctly", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} />);

    const pythonRadio = screen.getByLabelText("Python");
    fireEvent.click(pythonRadio);
    expect(pythonRadio).toBeChecked();

    const javascriptRadio = screen.getByLabelText("JavaScript");
    fireEvent.click(javascriptRadio);
    expect(javascriptRadio).toBeChecked();
    expect(pythonRadio).not.toBeChecked();
  });

  test("calls onInputChange with the correct arguments when an option is selected", () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} />);

    const cppRadio = screen.getByLabelText("C++");
    fireEvent.click(cppRadio);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, "C++");

    const pythonRadio = screen.getByLabelText("Python");
    fireEvent.click(pythonRadio);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, "Python");

    expect(mockOnInputChange).toHaveBeenCalledTimes(2);
  });

  test("displays error message when required field is not filled and user interacts", async () => {
    render(<SingleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} required />);

    const firstOption = screen.getByLabelText(options[0]);
    fireEvent.click(firstOption);

    fireEvent.click(firstOption);

    const errorMessage = screen.queryByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });
});
