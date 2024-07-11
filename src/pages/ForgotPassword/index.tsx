import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import logo from "../../assets/images/logo.jpg";
import { requestResetLink, signup } from "../../services/userService";
import AuthenticationForm, { FormType } from "../../components/AuthenticationForm";
import { passwordPattern } from "../../utils/regexp";
import { useSnackbar } from "notistack";
import path from "../../routes/path";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [slot, setSlot] = useState<React.ReactNode>(null);

  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = (email: string, password: string) =>
    signup(email, password)
      .then(() => {
        enqueueSnackbar("Sign up completed! Please log in.", {
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
    <Layout>
      <div className={styles.app}>
        <div className={styles.titleContainer}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <span className={styles.title}>Forgot Password?</span>
        </div>
        <AuthenticationForm
          slot={slot}
          onChange={handleFormChange}
          pageType={FormType.ForgotPassword}
          handelSubmit={handleSignUp}
          passwordRegex={passwordPattern}
          buttonClassName={styles.forgotPasswordButton}
        />
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
