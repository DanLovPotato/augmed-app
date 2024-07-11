import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import ForgotPasswordForm from "./index";

describe("ForgotPasswordForm", () => {
  const handleSubmit = jest.fn((email) => Promise.resolve());

  test("renders forgot password form", () => {
    render(<ForgotPasswordForm handelSubmit={handleSubmit} />);

    expect(screen.getByText("Request a Reset Link")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("auth-submit-button")).toBeInTheDocument();
  });

  test("updates email field correctly", () => {
    render(<ForgotPasswordForm handelSubmit={handleSubmit} />);

    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });

  test("enables submit button when email is inputted", () => {
    render(<ForgotPasswordForm handelSubmit={handleSubmit} />);

    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const button = screen.getByTestId("auth-submit-button");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(button).not.toBeDisabled();
  });

  test("displays error for invalid email", () => {
    render(<ForgotPasswordForm handelSubmit={handleSubmit} />);

    const button = screen.getByTestId("auth-submit-button");
    const emailInput = screen.getByTestId("email-input");

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(button);

    expect(screen.getByText("Invalid email address. Please correct it and try again.")).toBeInTheDocument();
  });

  test("submits form with valid email", async () => {
    const handleSubmit = jest.fn();
    render(<ForgotPasswordForm handelSubmit={handleSubmit} />);

    const emailInput = screen.getByTestId("email-input");

    fireEvent.change(emailInput, { target: { value: "validemail@example.com" } });
    fireEvent.submit(screen.getByTestId("form"));

    expect(handleSubmit).toHaveBeenCalledWith("validemail@example.com");
  });
});
