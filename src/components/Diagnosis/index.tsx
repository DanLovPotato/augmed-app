import React, { FunctionComponent, useLayoutEffect, useState } from "react";
import { FormHelperText, Slider, TextField, styled } from "@mui/material";

import styles from "./index.module.scss";

export type DiagnosisProps = {
  required?: boolean;
  value?: {
    diagnosis?: string;
    rationale?: string;
    confidence?: number;
  };
  onChange?: (value: DiagnosisProps["value"]) => void;
} & Pick<React.HTMLAttributes<HTMLDivElement>, "id" | "className">;

const ConfidenceSlider = styled(Slider)({
  color: "#A8E3BD",
});

const Diagnosis: FunctionComponent<DiagnosisProps> = (props) => {
  const { required, value, onChange, ...rest } = props;

  const [require, setRequire] = useState({
    diagnosis: false,
    rationale: false,
    confidence: false,
  });

  const handleOnChange = (name: string) => (event: unknown) => {
    const v = (event as { target: { value?: unknown } }).target.value;

    setRequire({
      ...require,
      [name]: required && (v === null || v === undefined || v === ""),
    });

    const newValue = {
      ...value,
      [name]: v,
    };
    onChange?.(newValue);
  };

  return (
    <div className={styles.diagnosis} {...rest}>
      <TextField
        fullWidth
        name="diagnosis"
        inputProps={{ maxLength: 256 }}
        value={value?.diagnosis}
        onChange={handleOnChange("diagnosis")}
        label="Probable Diagnosis"
        variant="outlined"
        error={require.diagnosis}
        margin="normal"
      />
      {require.diagnosis && <FormHelperText error>Probable Diagnosis field is required.</FormHelperText>}
      <TextField
        fullWidth
        multiline
        rows={4}
        name="rationale"
        inputProps={{ maxLength: 1000 }}
        value={value?.rationale}
        onChange={handleOnChange("rationale")}
        error={require.rationale}
        label="Brief rationale for diagnosis"
        margin="normal"
      />
      {require.rationale && <FormHelperText error>Brief rationale for diagnosis field is required.</FormHelperText>}
      <div className={styles.confidence}>
        <ConfidenceSlider name="confidence" value={value?.confidence} onChange={handleOnChange("confidence")!} />
        <div className={styles.label}>
          <span className={styles.low}>LOW CONFIDENCE</span>
          <span className={styles.high}>HIGH CONFIDENCE</span>
        </div>
        {require.confidence && <FormHelperText error>Confidence field is required.</FormHelperText>}
      </div>
    </div>
  );
};

export default Diagnosis;
