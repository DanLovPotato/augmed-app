import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Answer from "./index";
import { MultipleChoiceProps } from "./MultipleChoice";
import { SingleChoiceProps } from "./SingleChoice";
import { ShortTextProps } from "./ShortText";
import { ParagraphProps } from "./Paragraph";

jest.mock("./MultipleChoice", () => {
  const MultipleChoice = ({ title, onInputChange, value }: MultipleChoiceProps) => (
    <div data-testid="multiple-choice" onClick={() => onInputChange(title, ["Option 1"])}>
      {title} - {value.join(", ")}
    </div>
  );
  MultipleChoice.displayName = "MockMultipleChoiceComponent";
  return MultipleChoice;
});

jest.mock("./SingleChoice", () => {
  const SingleChoice = ({ title, onInputChange, value }: SingleChoiceProps) => (
    <div data-testid="single-choice" onClick={() => onInputChange(title, "Option A")}>
      {title} - {value}
    </div>
  );
  SingleChoice.displayName = "MockSingleChoiceComponent";
  return SingleChoice;
});

jest.mock("./ShortText", () => {
  const ShortText = ({ title, onInputChange, value }: ShortTextProps) => (
    <div data-testid="short-text" onClick={() => onInputChange(title, "text input")}>
      {title} - {value}
    </div>
  );
  ShortText.displayName = "MockShortTextComponent";
  return ShortText;
});

jest.mock("./Paragraph", () => {
  const Paragraph = ({ title, onInputChange, value }: ParagraphProps) => (
    <div data-testid="paragraph" onClick={() => onInputChange(title, "paragraph input")}>
      {title} - {value}
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
  const answerFormData = {
    "Choose one": ["Option 1"],
    "Select one": "Option A",
    "Enter text": "text input",
    "Write paragraph": "paragraph input",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders components based on configList and passes onInputChange correctly", () => {
    render(<Answer configList={configList} onInputChange={mockOnInputChange} answerFormData={answerFormData} />);

    const multipleChoice = screen.getByTestId("multiple-choice");
    expect(multipleChoice).toHaveTextContent("Choose one - Option 1");
    fireEvent.click(multipleChoice);
    expect(mockOnInputChange).toHaveBeenCalledWith("Choose one", ["Option 1"]);

    const singleChoice = screen.getByTestId("single-choice");
    expect(singleChoice).toHaveTextContent("Select one - Option A");
    fireEvent.click(singleChoice);
    expect(mockOnInputChange).toHaveBeenCalledWith("Select one", "Option A");

    const shortText = screen.getByTestId("short-text");
    expect(shortText).toHaveTextContent("Enter text - text input");
    fireEvent.click(shortText);
    expect(mockOnInputChange).toHaveBeenCalledWith("Enter text", "text input");

    const paragraph = screen.getByTestId("paragraph");
    expect(paragraph).toHaveTextContent("Write paragraph - paragraph input");
    fireEvent.click(paragraph);
    expect(mockOnInputChange).toHaveBeenCalledWith("Write paragraph", "paragraph input");
  });
});
