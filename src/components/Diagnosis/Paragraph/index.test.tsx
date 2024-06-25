import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ParagraphComponent from "./index";

describe("ParagraphComponent", () => {
  const question = "Please describe your experience:";

  test("renders correctly with the given question", () => {
    render(<ParagraphComponent question={question} />);
    expect(screen.getByLabelText(question)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  test("updates input value on user typing", () => {
    render(<ParagraphComponent question={question} />);
    const input = screen.getByLabelText(question);
    userEvent.type(input, "It was great!");
    expect(input).toHaveValue("It was great!");
  });
});
