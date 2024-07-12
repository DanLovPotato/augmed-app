import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ResetPasswordPage from "./index";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import path from "../../routes/path";
import styles from "./index.module.scss";
import { resetPassword } from "../../services/userService";

Element.prototype.scrollTo = jest.fn();

jest.mock("../../services/userService", () => ({
  ...jest.requireActual("../../services/userService"),
  resetPassword: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: jest.fn(), // mock the hook
}));

describe("ResetPasswordPage", () => {
  test("check elements in reset password page", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password/token"]}>
        <Routes>
          <Route path={path.resetPassword} element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Reset Password")).toBeInTheDocument();
    expect(screen.getByText("New Password")).toBeInTheDocument();
    expect(screen.getByTestId("new-password-input")).toBeInTheDocument();
    expect(screen.getByText("Password Confirmation")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("input password and password confirmation and they are masked", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password/token"]}>
        <Routes>
          <Route path={path.resetPassword} element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const passwordInput = screen.getByTestId("new-password-input") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId("confirm-password-input") as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "123" } });

    expect(passwordInput.value).toBe("123");
    expect(confirmPasswordInput.value).toBe("123");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });

  test("displays password in text format when click icon", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password/token"]}>
        <Routes>
          <Route path={path.resetPassword} element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const passwordInput = screen.getByTestId("new-password-input") as HTMLInputElement;
    const passwordVisibilityButton = screen.getByTestId("new-password-visibility-button");
    const confirmPasswordInput = screen.getByTestId("confirm-password-input") as HTMLInputElement;
    const confirmPasswordVisibilityButton = screen.getByTestId(
      "confirm-password-visibility-button",
    ) as HTMLInputElement;

    fireEvent.click(passwordVisibilityButton);
    fireEvent.click(confirmPasswordVisibilityButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(confirmPasswordInput).toHaveAttribute("type", "text");
  });

  test("validate password and confirm password should be the same", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password/token"]}>
        <Routes>
          <Route path={path.resetPassword} element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const passwordInput = screen.getByTestId("new-password-input") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId("confirm-password-input") as HTMLInputElement;
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "1234" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("The new password and confirmation password should be the same.")).toBeInTheDocument();
  });

  test("validate password format", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password/token"]}>
        <Routes>
          <Route path={path.resetPassword} element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const passwordInput = screen.getByTestId("new-password-input") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId("confirm-password-input") as HTMLInputElement;
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "123" } });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(
        "Password must have at least 8 characters and contain at least a letter, a number and a symbol.",
      ),
    ).toHaveClass(styles.invalidPasswordText);
  });

  test("submit password reset successfully", async () => {
    (resetPassword as jest.Mock).mockReturnValue(
      Promise.resolve({
        data: {
          data: "Update successfully",
        },
        status: 200,
      }),
    );
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter initialEntries={["/reset-password/token"]}>
        <Routes>
          <Route path={path.resetPassword} element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const passwordInput = screen.getByTestId("new-password-input") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId("confirm-password-input") as HTMLInputElement;
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(passwordInput, { target: { value: "admin@123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "admin@123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // wait for this function to not throw an error
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("submit password reset when return error", async () => {
    (resetPassword as jest.Mock).mockReturnValue(
      Promise.reject({
        message: "api failed",
      }),
    );

    render(
      <MemoryRouter initialEntries={["/reset-password/token"]}>
        <Routes>
          <Route path={path.resetPassword} element={<ResetPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const passwordInput = screen.getByTestId("new-password-input") as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId("confirm-password-input") as HTMLInputElement;
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(passwordInput, { target: { value: "admin@123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "admin@123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // wait for this function to not throw an error
      expect(screen.getByText("api failed")).toBeInTheDocument();
    });
  });
});
