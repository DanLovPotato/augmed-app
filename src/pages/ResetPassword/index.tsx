import React, { Dispatch, useState } from "react";

import Layout from "../../components/Layout";

import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { Button, CircularProgress, FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { passwordPattern } from "../../utils/regexp";
import path from "../../routes/path";

import { resetPassword } from "../../services/userService";
import { useSnackbar } from "notistack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ResetFormProps {
  passwordRegex: RegExp;
}

interface PasswordInputProps {
  label: string;
  prefix: string;
  value: string;
  valid: boolean;
  show: boolean;
  setValue: (value: string) => void;
  setValid: (valid: boolean) => void;
  setShow: Dispatch<(previous: boolean) => boolean>;
  onChange?: () => void;
}

const PasswordInput = ({
  label,
  prefix,
  value,
  valid,
  show,
  setValue,
  setValid,
  setShow,
  onChange,
}: PasswordInputProps) => {
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.();
    setValue(event.target.value);
    setValid(true);
  };

  const handleIconClick = () => {
    setShow((show) => !show);
  };

  return (
    <FormControl className={`${styles.formController} ${styles.pwController} `} sx={{ marginBottom: "30px" }}>
      <label
        className={styles.inputLabel}
        htmlFor={prefix + "-password-input"}
        data-testid={prefix + "-password-label"}
      >
        {label}
      </label>
      <OutlinedInput
        id={prefix + "-password-input"}
        inputProps={{ "data-testid": prefix + "-password-input", maxLength: 128 }}
        value={value}
        error={!valid}
        type={show ? "text" : "password"}
        onChange={handleInputChange}
        required
        className={styles.passwordInput}
        placeholder="Enter Password"
        // autoComplete="current-password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              data-testid={prefix + "-password-visibility-button"}
              onClick={handleIconClick}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

const ResetPasswordForm = ({ passwordRegex }: ResetFormProps) => {
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const { token } = useParams() as { token: string };
  const nav = useNavigate();
  const [slot, setSlot] = useState<React.ReactNode>(null);
  const { enqueueSnackbar } = useSnackbar();

  const validatePassword = () => {
    const valid = passwordRegex.test(password);
    setIsPasswordValid(valid);
    return valid;
  };

  const validateConfirmPassword = () => {
    const valid = password !== "" && password === confirmPassword;
    setIsConfirmPasswordValid(valid);
    return valid;
  };

  const validateAndSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateConfirmPassword() && validatePassword()) {
      setSubmitLoading(true);
      try {
        await handelSubmit(token, password);
      } catch (e) {
        console.error("An error occurred:", e);
      }
      setSubmitLoading(false);
    }
  };

  const handelSubmit = (resetToken: string, password: string) =>
    resetPassword(resetToken, password)
      .then(() => {
        enqueueSnackbar("Password Successfully Updated!", {
          anchorOrigin: {
            horizontal: "center",
            vertical: "bottom",
          },
          variant: "success",
          autoHideDuration: 2000,
        });
        nav(path.login);
      })
      .catch((error) => {
        setSlot(
          <div className={styles.errorContainer}>
            <ErrorOutlineIcon />
            <span className={styles.errorMessage}>{error.message}</span>
          </div>,
        );
      });

  const handleFormChange = () => {
    setSlot(null);
  };

  return (
    <form className={styles.form} onSubmit={validateAndSubmit} data-testid={"form"}>
      <PasswordInput
        label={"New Password"}
        prefix={"new"}
        value={password}
        valid={isPasswordValid}
        show={showPassword}
        setValue={setPassword}
        setValid={setIsPasswordValid}
        setShow={setShowPassword}
        onChange={handleFormChange}
      />
      <span className={isPasswordValid ? styles.passwordRuleText : styles.invalidPasswordText}>
        Password must have at least 8 characters and contain at least a letter, a number and a symbol.
      </span>
      <PasswordInput
        label={"Password Confirmation"}
        prefix={"confirm"}
        value={confirmPassword}
        valid={isConfirmPasswordValid}
        show={showConfirmPassword}
        setValue={setConfirmPassword}
        setValid={setIsConfirmPasswordValid}
        setShow={setShowConfirmPassword}
        onChange={handleFormChange}
      />
      {!isConfirmPasswordValid && (
        <div className={styles.errorContainer}>
          <ErrorOutlineIcon />
          <span className={styles.errorMessage}>The new password and confirmation password should be the same.</span>
        </div>
      )}
      {slot}
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          data-testid="submit-button"
          variant="contained"
          type="submit"
          disabled={!isPasswordValid || !isConfirmPasswordValid}
        >
          {submitLoading ? <CircularProgress size={24} /> : "Reset"}
        </Button>
      </div>
    </form>
  );
};

const ResetPasswordPage = () => {
  return (
    <Layout>
      <div className={styles.app}>
        <div className={styles.titleContainer}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <span className={styles.title}>Reset Password</span>
        </div>
        <ResetPasswordForm passwordRegex={passwordPattern} />
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
