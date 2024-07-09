import React, { FunctionComponent, useState, useEffect } from "react";
import { FormControl, FormHelperText, FormLabel, TextField } from "@mui/material";
import styles from "./index.module.scss";

export interface ParagraphProps {
  title: string;
  onInputChange: (title: string, value: string) => void;
  required?: boolean;
  value: string;
}

const ParagraphComponent: FunctionComponent<ParagraphProps> = (props) => {
  const [unDirty, setUnDirty] = useState(false);
  const inputId = `input-${props.title.replace(/ /g, "-")}`;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnDirty(true);
    props.onInputChange(props.title, event.target.value);
  };

  return (
    <FormControl fullWidth className={styles.container} error={unDirty && props.required && !props.value}>
      <FormLabel htmlFor={inputId} required={props.required} className={styles.label}>
        {props.title}
      </FormLabel>
      <TextField id={inputId} multiline rows={4} fullWidth onChange={handleInputChange} data-testid={inputId} />
      {unDirty && props.required && !props.value && (
        <FormHelperText className={styles.formHelperText}>This field is required</FormHelperText>
      )}
    </FormControl>
  );
};

export default ParagraphComponent;
