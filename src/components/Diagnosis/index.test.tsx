import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Diagnosis from ".";
import testId from "../../utils/testId";

describe("Diagnosis component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(<Diagnosis onChange={mockOnChange} {...testId("diagnosis-component")} />);
  });

  it("renders without crashing", () => {
    const diagnosisComponent = screen.getByTestId("diagnosis-component");
    expect(diagnosisComponent).toBeInTheDocument();
  });

  it("updates diagnosis value on change", () => {
    const diagnosisInput = screen.getByLabelText("Probable Diagnosis");
    fireEvent.change(diagnosisInput, { target: { value: "Test Diagnosis" } });
    expect(mockOnChange).toHaveBeenCalledWith({
      diagnosis: "Test Diagnosis",
      rationale: undefined,
      confidence: undefined,
    });
  });

  it("updates rationale value on change", () => {
    const rationaleInput = screen.getByLabelText("Brief rationale for diagnosis");
    fireEvent.change(rationaleInput, { target: { value: "Test Rationale" } });
    expect(mockOnChange).toHaveBeenCalledWith({
      diagnosis: undefined,
      rationale: "Test Rationale",
      confidence: undefined,
    });
  });

  it("updates confidence value on change", () => {
    const confidenceSlider = screen.getByRole("slider");
    fireEvent.change(confidenceSlider, { target: { value: 50 } });
    expect(mockOnChange).toHaveBeenCalledWith({
      diagnosis: undefined,
      rationale: undefined,
      confidence: 50,
    });
  });
});
