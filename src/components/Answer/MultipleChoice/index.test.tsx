import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MultipleChoiceComponent from "./index";

describe("MultipleChoiceComponent", () => {
  const title = "What is your favorite color?";
  const options = ["Red", "Green", "Blue"];
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear();
  });

  test("renders the title and options correctly", () => {
    render(<MultipleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value={[]} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test("initializes with the correct values when provided", () => {
    render(
      <MultipleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value={["Red"]} />,
    );
    const redCheckbox = screen.getByLabelText("Red");
    expect(redCheckbox).toBeChecked();
  });

  test("allows multiple selections and reflects the change correctly", () => {
    render(<MultipleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value={[]} />);

    const redCheckbox = screen.getByLabelText("Red");
    fireEvent.click(redCheckbox);

    expect(redCheckbox).toBeChecked();
    expect(mockOnInputChange).toHaveBeenCalledWith(title, ["Red"]);

    const greenCheckbox = screen.getByLabelText("Green");
    fireEvent.click(greenCheckbox);

    expect(greenCheckbox).toBeChecked();
    expect(mockOnInputChange).toHaveBeenCalledWith(title, ["Red", "Green"]);

    expect(redCheckbox).toBeChecked();
  });

  test("records multiple invocations of onInputChange", () => {
    render(<MultipleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value={[]} />);

    fireEvent.click(screen.getByLabelText("Red"));
    fireEvent.click(screen.getByLabelText("Green"));

    expect(mockOnInputChange).toHaveBeenCalledTimes(2);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, ["Red"]);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, ["Red", "Green"]);
  });

  test("displays error message when required field is not filled and user interacts", () => {
    render(
      <MultipleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} required value={[]} />,
    );

    const redCheckbox = screen.getByLabelText("Red");

    expect(screen.queryByText("This field is required")).not.toBeInTheDocument();

    fireEvent.click(redCheckbox);
    fireEvent.click(redCheckbox);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
