import React, { FunctionComponent, useState } from "react";
import { FormControl, FormLabel, TextField, FormHelperText } from "@mui/material";
import styles from "./index.module.scss";

export interface ParagraphProps {
  title: string;
  onInputChange: (title: string, value: string) => void;
  required?: boolean;
}

const ParagraphComponent: FunctionComponent<ParagraphProps> = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [unDirty, setUnDirty] = useState(false);
  const inputId = `input-${props.title.replace(/ /g, "-")}`;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnDirty(true);
    setInputValue(event.target.value);
    props.onInputChange(props.title, event.target.value);
  };

  return (
    <FormControl fullWidth className={styles.container} error={unDirty && props.required && !inputValue}>
      <FormLabel htmlFor={inputId} required={props.required}>
        {props.title}
      </FormLabel>
      <TextField id={inputId} multiline rows={4} fullWidth value={inputValue} onChange={handleInputChange} />
      {unDirty && props.required && !inputValue && <FormHelperText>This field is required</FormHelperText>}
    </FormControl>
  );
};

export default ParagraphComponent;
