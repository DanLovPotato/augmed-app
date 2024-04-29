import React, { useLayoutEffect, useMemo, useState } from "react";
import { Button, TextField } from "@mui/material";
import cls from "classnames";

import Diagnosis, { DiagnosisProps } from "../../components/Diagnosis";

import styles from "./index.module.scss";

type DiagnoseValue = DiagnosisProps["value"];

const DiagnosisCount = 3;

const Diagnose = () => {
  const [diagnose, setDiagnose] = useState<DiagnoseValue[]>(
    Array.from({ length: DiagnosisCount }).fill({
      diagnosis: undefined,
      rationale: undefined,
      confidence: undefined,
    }) as DiagnoseValue[],
  );
  const [other, setOther] = useState("");
  const [disable, setDisable] = useState(true);

  const handleOnDiagnoseChange = (index: number, value: DiagnoseValue) => {
    const newValue = diagnose.reduce((prev, current, currentIdx) => {
      if (currentIdx === index) {
        return [...prev, value];
      }
      return [...prev, current];
    }, [] as DiagnoseValue[]);

    setDiagnose(newValue);
  };

  const diagnoseValuesIsRequired = useMemo(() => {
    return Array.from({ length: DiagnosisCount }).map((_, index) => {
      return index === 0;
    });
  }, [DiagnosisCount]);

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
        onChange={(e) => setOther(e.target.value)}
        inputProps={{ maxLength: 1000 }}
        label="What other information would have been useful?"
      />
      <Button className={styles.submit} disabled={disable} variant="contained" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Diagnose;
