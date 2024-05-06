import React, { ChangeEvent, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useAtom } from "jotai";
import cls from "classnames";

import { diagnoseAtom } from "../../state";
import Diagnosis, { DiagnosisProps } from "../../components/Diagnosis";
import CaseTitle from "../../components/CaseTitle";

import styles from "./index.module.scss";

type DiagnoseValue = DiagnosisProps["value"];

const DiagnosisCount = 3;

const DEFAULT_DIAGNOSE_VALUE = {
  diagnosis: "",
  rationale: "",
  confidence: 0,
};

export type DiagnoseFormData = {
  diagnose?: DiagnoseValue[];
  other?: string;
};

const Diagnose = () => {
  const { caseId } = useParams() as { caseId: string };
  const nav = useNavigate();

  const [diagnoseState, setDiagnoseState] = useAtom(diagnoseAtom);
  const defaultValue = diagnoseState[caseId];

  const [diagnose, setDiagnose] = useState<DiagnoseValue[]>(
    defaultValue?.diagnose ?? (Array.from({ length: DiagnosisCount }).fill(DEFAULT_DIAGNOSE_VALUE) as DiagnoseValue[]),
  );
  const [other, setOther] = useState(defaultValue?.other ?? "");
  const [disable, setDisable] = useState(true);

  const diagnoseValuesIsRequired = useMemo(() => {
    return Array.from({ length: DiagnosisCount }).map((_, index) => {
      return index === 0;
    });
  }, []);

  const handleOnDiagnoseChange = (index: number, value: DiagnoseValue) => {
    const updatedDiagnose = diagnose.reduce((prev, current, currentIdx) => {
      if (currentIdx === index) {
        return [...prev, value];
      }
      return [...prev, current];
    }, [] as DiagnoseValue[]);

    setDiagnose(updatedDiagnose);

    setDiagnoseState({
      ...diagnoseState,
      [caseId]: {
        diagnose: updatedDiagnose,
        other: other,
      },
    });
  };

  const handleOtherChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOther(e.target.value);

    setDiagnoseState({
      ...diagnoseState,
      [caseId]: {
        diagnose,
        other: e.target.value,
      },
    });
  };

  useLayoutEffect(() => {
    const isDisabled = diagnose.some((value = {}, idx) => {
      return Object.values(value).some((field) => {
        return diagnoseValuesIsRequired[idx] && (field === null || field === undefined || field === "");
      });
    });

    setDisable(isDisabled);
  }, [diagnose, setDisable, diagnoseValuesIsRequired]);

  const onSubmit = () => {
    const data = {
      diagnose,
      other: other,
    };

    console.log(data);
  };

  return (
    <>
      <div className={styles.header}>Diagnose</div>
      <CaseTitle
        name="Jane S."
        case="Case 987-498274"
        suffix={
          <Button variant="contained" color="secondary" onClick={() => nav(-1)}>
            CASE REVIEW
          </Button>
        }
      />
      <div className={styles.container}>
        {diagnose.map((value, i) => {
          const indexStartAt1 = i + 1;
          const required = diagnoseValuesIsRequired[i];

          return (
            <div key={i}>
              <div className={cls(styles.index, { [styles.require]: required })}>
                <span className={styles.circle}>{indexStartAt1}</span>
              </div>
              <Diagnosis
                key={i}
                required={required}
                value={value}
                onChange={(value) => handleOnDiagnoseChange(i, value)}
              />
            </div>
          );
        })}
        <TextField
          fullWidth
          multiline
          rows={4}
          className={styles.otherFiled}
          name="other"
          value={other}
          onChange={handleOtherChange}
          inputProps={{ maxLength: 1000 }}
          label="What other information would have been useful?"
        />
        <Button className={styles.submit} disabled={disable} variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Diagnose;
