import React from "react";
import { Button, TextField } from "@mui/material";
import cls from "classnames";

import Diagnosis from "../../components/Diagnosis";

import styles from "./index.module.scss";

const DiagnosisCount = 3;

const Diagnose = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: DiagnosisCount }).map((_, i) => {
        const indexStartAt1 = i + 1;
        const required = indexStartAt1 === 1;

        return (
          <div key={indexStartAt1}>
            <div className={cls(styles.index, { [styles.require]: required })}>
              <span className={styles.circle}>{indexStartAt1}</span>
            </div>
            <Diagnosis key={i} required={required} />
          </div>
        );
      })}
      <TextField
        fullWidth
        multiline
        rows={4}
        className={styles.otherFiled}
        name="other"
        inputProps={{ maxLength: 1000 }}
        label="What other information would have been useful?"
      />
      <Button className={styles.submit} variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default Diagnose;
