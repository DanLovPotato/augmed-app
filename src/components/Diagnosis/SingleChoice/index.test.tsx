import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SingleChoiceComponent from "./index";

describe("SingleChoiceComponent", () => {
  const question = "What is your favorite programming language?";
  const options = ["JavaScript", "Python", "C++"];

  test("renders the question and options correctly", () => {
    render(<SingleChoiceComponent question={question} options={options} />);

    expect(screen.getByText(question)).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test("allows only one selection and reflects the change correctly", () => {
    render(<SingleChoiceComponent question={question} options={options} />);

    const pythonRadio = screen.getByLabelText("Python");
    fireEvent.click(pythonRadio);

    expect(pythonRadio).toBeChecked();

    const javascriptRadio = screen.getByLabelText("JavaScript");
    fireEvent.click(javascriptRadio);

    expect(javascriptRadio).toBeChecked();

    expect(pythonRadio).not.toBeChecked();
  });
});
