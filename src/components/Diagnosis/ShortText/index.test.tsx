import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShortTextComponent from "./index";

describe("ShortTextComponent", () => {
  const question = "Your feedback:";

  test("renders correctly with the given question", () => {
    render(<ShortTextComponent question={question} />);
    expect(screen.getByLabelText(question)).toBeInTheDocument();
  });

  test("updates input value on user typing", () => {
    render(<ShortTextComponent question={question} />);
    const input = screen.getByLabelText(question);
    userEvent.type(input, "Great experience!");
    expect(input).toHaveValue("Great experience!");
  });
});
