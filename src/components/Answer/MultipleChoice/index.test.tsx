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

  test("handleInputChange is triggered when an option is selected", () => {
    render(<MultipleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value={[]} />);
    const greenCheckbox = screen.getByLabelText("Green");
    fireEvent.click(greenCheckbox);
    expect(mockOnInputChange).toHaveBeenCalledTimes(1);
    expect(mockOnInputChange).toHaveBeenCalledWith(title, ["Green"]);
  });

  test("checks error message visibility directly after option selection", () => {
    render(
      <MultipleChoiceComponent title={title} options={options} onInputChange={mockOnInputChange} value={[]} required />,
    );
    expect(screen.queryByText("This field is required")).not.toBeInTheDocument();
    const greenCheckbox = screen.getByLabelText("Green");
    fireEvent.click(greenCheckbox);
    fireEvent.click(greenCheckbox);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
