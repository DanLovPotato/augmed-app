import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Diagnosis from "./index";
import { MultipleChoiceProps } from "./MultipleChoice";
import { SingleChoiceProps } from "./SingleChoice";
import { ShortTextProps } from "./ShortText";
import { ParagraphProps } from "./Paragraph";

jest.mock("./MultipleChoice", () => {
  const MultipleChoice = ({ title, onInputChange }: MultipleChoiceProps) => (
    <div data-testid="multiple-choice" onClick={() => onInputChange(title, "Option 1")}>
      {title}
    </div>
  );
  MultipleChoice.displayName = "MockMultipleChoiceComponent";
  return MultipleChoice;
});

jest.mock("./SingleChoice", () => {
  const SingleChoice = ({ title, onInputChange }: SingleChoiceProps) => (
    <div data-testid="single-choice" onClick={() => onInputChange(title, "Option A")}>
      {title}
    </div>
  );
  SingleChoice.displayName = "MockSingleChoiceComponent";
  return SingleChoice;
});

jest.mock("./ShortText", () => {
  const ShortText = ({ title, onInputChange }: ShortTextProps) => (
    <div data-testid="short-text" onClick={() => onInputChange(title, "text input")}>
      {title}
    </div>
  );
  ShortText.displayName = "MockShortTextComponent";
  return ShortText;
});

jest.mock("./Paragraph", () => {
  const Paragraph = ({ title, onInputChange }: ParagraphProps) => (
    <div data-testid="paragraph" onClick={() => onInputChange(title, "paragraph input")}>
      {title}
    </div>
  );
  Paragraph.displayName = "MockParagraphComponent";
  return Paragraph;
});

describe("Diagnosis Component", () => {
  const mockOnInputChange = jest.fn();
  const configList = [
    { type: "MultipleChoice" as const, title: "Choose one", options: ["Option 1", "Option 2"] },
    { type: "SingleChoice" as const, title: "Select one", options: ["Option A", "Option B"] },
    { type: "Text" as const, title: "Enter text" },
    { type: "Paragraph" as const, title: "Write paragraph" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders components based on configList and passes onInputChange correctly", () => {
    render(<Diagnosis configList={configList} onInputChange={mockOnInputChange} />);

    const multipleChoice = screen.getByTestId("multiple-choice");
    fireEvent.click(multipleChoice);
    expect(mockOnInputChange).toHaveBeenCalledWith("Choose one", "Option 1");

    const singleChoice = screen.getByTestId("single-choice");
    fireEvent.click(singleChoice);
    expect(mockOnInputChange).toHaveBeenCalledWith("Select one", "Option A");

    const shortText = screen.getByTestId("short-text");
    fireEvent.click(shortText);
    expect(mockOnInputChange).toHaveBeenCalledWith("Enter text", "text input");

    const paragraph = screen.getByTestId("paragraph");
    fireEvent.click(paragraph);
    expect(mockOnInputChange).toHaveBeenCalledWith("Write paragraph", "paragraph input");
  });
});
