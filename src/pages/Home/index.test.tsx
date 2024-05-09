import React from "react";
import { render, screen } from "@testing-library/react";
import { useRequest } from "ahooks";
import HomePage from "./index";

jest.mock("ahooks");
jest.mock("../../services/caseService");
jest.mock("../../components/Loading", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock("../../components/CaseCard", () => ({
  __esModule: true,
  default: ({ patientCase }: { patientCase: any }) => <div>{patientCase.patient_chief_complaint}</div>,
}));

describe("HomePage", () => {
  const mockCases = [
    { config_id: 1, case_id: 101, patient_chief_complaint: "Cough", age: "45", gender: "Male" },
    { config_id: 2, case_id: 102, patient_chief_complaint: "Fever", age: "30", gender: "Female" },
  ];

  test("renders cases when data is fetched", async () => {
    (useRequest as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: { data: { data: mockCases } },
    }));
    render(<HomePage />);
    expect(screen.getByText("Cough")).toBeInTheDocument();
    expect(screen.getByText("Fever")).toBeInTheDocument();
  });

  test("shows no available tasks message when no cases are present", () => {
    (useRequest as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: { data: { data: [] } },
    }));
    render(<HomePage />);
    expect(screen.getByText(/There is no available task for you now. Please contact/)).toBeInTheDocument();
  });

  test("shows error message when there is an unexpected error", () => {
    (useRequest as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: undefined,
    }));
    render(<HomePage />);
    expect(
      screen.getByText("There is an unexpected error. Please check your internet and try again."),
    ).toBeInTheDocument();
  });
});
