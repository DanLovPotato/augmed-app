import React, { useState } from "react";
import { Button, FormControl, OutlinedInput, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import styles from "./index.module.scss";

interface ForgotPasswordFormProps {
  handelSubmit: (email: string) => Promise<void>;
  slot?: React.ReactNode;
  onChange?: () => void;
}

const ForgotPasswordForm = ({ handelSubmit, slot, onChange }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.();
    setEmail(event.target.value);
    setIsEmailValid(true);
  };
  const validateAndSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateEmail()) {
      setSubmitLoading(true);
      try {
        await handelSubmit(email);
      } catch (e) {
        console.error("An error occurred:", e);
      }
      setSubmitLoading(false);
    }
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  return (
    <form className={styles.form} onSubmit={validateAndSubmit} data-testid={"form"}>
      <FormControl className={styles.formController}>
        <label className={styles.inputLabel} htmlFor="email">
          Email
        </label>
        <OutlinedInput
          id="email"
          inputProps={{ "data-testid": "email-input" }}
          required
          error={!isEmailValid}
          value={email}
          className={styles.emailInput}
          sx={isEmailValid ? { marginBottom: "20px" } : {}}
          onChange={handleEmailChange}
          placeholder="Enter Email"
          autoComplete="email"
        />
        {!isEmailValid && (
          <span className={styles.invalidEmailText}>Invalid email address. Please correct it and try again.</span>
        )}
      </FormControl>
      {slot}
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          data-testid="auth-submit-button"
          variant="contained"
          type="submit"
          disabled={email === ""}
        >
          {submitLoading ? <CircularProgress size={24} /> : "Request a Reset Link"}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
