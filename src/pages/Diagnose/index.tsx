import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import { useSnackbar } from "notistack";

import { caseAtom } from "../../state";
import Diagnosis from "../../components/Diagnosis";
import CaseTitle from "../../components/CaseTitle";
import { getAnswerPageConfig, saveDiagnose } from "../../services/diagnoseService";
import path from "../../routes/path";
import testId from "../../utils/testId";

import styles from "./index.module.scss";

export type AnswerFormData = Record<string, any>;

const Diagnose = () => {
  const { caseConfigId } = useParams() as { caseConfigId: string };
  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { loading: submitLoading, runAsync } = useRequest(saveDiagnose, {
    manual: true,
  });
  const { data, loading } = useRequest(getAnswerPageConfig, {});
  const configList = data?.data.data.config ?? [];
  const answerConfigId = data?.data.data.id ?? "";

  const [caseState] = useAtom(caseAtom);

  const [disable, setDisable] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [answerFormData, setAnswerFormData] = useState({} as AnswerFormData);

  const handleInputChange = (title: string, value: string | string[]) => {
    setAnswerFormData((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  useLayoutEffect(() => {
    const isFormEmpty = Object.keys(answerFormData).length === 0;
    const hasUnansweredRequiredFields = configList.some((config) => {
      if (config.required) {
        const value = answerFormData[config.title];
        return !value || value.length === 0;
      }
      return false;
    });

    setDisable(isFormEmpty || hasUnansweredRequiredFields);
  }, [answerFormData, configList]);

  const onSubmit = () => {
    runAsync(caseConfigId, answerFormData, answerConfigId)
      .then(() => {
        enqueueSnackbar("Case is submitted.", {
          anchorOrigin: {
            horizontal: "center",
            vertical: "bottom",
          },
          variant: "success",
          autoHideDuration: 2000,
        });
        nav(path.root);
      })
      .catch((e: Error) => {
        setErrorMsg(e.message);
      });
  };

  return (
    <>
      <div className={styles.header}>Diagnose</div>
      <CaseTitle
        name={caseState.personName}
        case={`Case ${caseState.caseNumber}`}
        suffix={
          <Button variant="contained" color="secondary" onClick={() => nav(-1)}>
            CASE REVIEW
          </Button>
        }
      />
      <div className={styles.container}>
        <Diagnosis configList={configList} onInputChange={handleInputChange} />
        <Button
          {...testId("diagnose-submit-btn")}
          className={styles.submit}
          disabled={disable || submitLoading}
          variant="contained"
          onClick={onSubmit}
          endIcon={submitLoading && <SyncIcon className={styles.spin} />}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Diagnose;
