import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MultipleChoiceComponent from "./index";

describe("MultipleChoiceComponent", () => {
  const question = "What is your favorite color?";
  const options = ["Red", "Green", "Blue"];

  test("renders the question and options correctly", () => {
    render(<MultipleChoiceComponent question={question} options={options} />);

    expect(screen.getByText(question)).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test("allows multiple selections and reflects the change correctly", () => {
    render(<MultipleChoiceComponent question={question} options={options} />);

    const redCheckbox = screen.getByLabelText("Red");
    fireEvent.click(redCheckbox);

    expect(redCheckbox).toBeChecked();

    const greenCheckbox = screen.getByLabelText("Green");
    fireEvent.click(greenCheckbox);

    expect(greenCheckbox).toBeChecked();

    expect(redCheckbox).toBeChecked();
  });
});
