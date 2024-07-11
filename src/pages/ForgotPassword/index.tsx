import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import logo from "../../assets/images/logo.jpg";
import { requestResetLink, signup } from "../../services/userService";
import { useSnackbar } from "notistack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [slot, setSlot] = useState<React.ReactNode>(null);

  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleResetPasswordRequest = (email: string) =>
    requestResetLink(email)
      .then(() => {
        enqueueSnackbar("The reset password link is sent to your email.", {
          anchorOrigin: {
            horizontal: "center",
            vertical: "bottom",
          },
          variant: "success",
          autoHideDuration: 2000,
        });
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
        <ForgotPasswordForm slot={slot} onChange={handleFormChange} handelSubmit={handleResetPasswordRequest} />
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
