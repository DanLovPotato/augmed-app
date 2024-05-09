import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Gender, ICase } from "../../types/case";
import CaseCard from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: jest.fn(), // mock the hook
}));

describe("CaseCard", () => {
  const mockCase: ICase = {
    config_id: 1,
    case_id: 101,
    patient_chief_complaint: "Cough",
    age: "45",
    gender: Gender.MALE,
  };

  test("displays the correct case information", () => {
    render(<CaseCard patientCase={mockCase} />, { wrapper: BrowserRouter });
    expect(screen.getByText(`Case: ${mockCase.case_id}`)).toBeInTheDocument();
    expect(screen.getByText(mockCase.patient_chief_complaint)).toBeInTheDocument();
    expect(screen.getByText(`${mockCase.age}, ${mockCase.gender}`)).toBeInTheDocument();
  });

  test("navigates on click when no onClick prop provided", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <CaseCard patientCase={mockCase} />
      </BrowserRouter>,
    );

    const card = screen.getByText(`Case: ${mockCase.case_id}`);
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith(`/case-review/${mockCase.config_id}`);
  });

  test("navigates on card click", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <CaseCard className="testClass" patientCase={mockCase} />
      </BrowserRouter>,
    );

    const card = screen.getByText(`Case: ${mockCase.case_id}`);
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith("/case-review/1");
  });
});
