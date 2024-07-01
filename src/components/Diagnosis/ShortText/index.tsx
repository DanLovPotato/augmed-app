import React, { FunctionComponent, useState } from "react";
import { FormControl, FormHelperText, FormLabel, TextField } from "@mui/material";
import styles from "./index.module.scss";

export interface ShortTextProps {
  title: string;
  onInputChange: (title: string, value: string) => void;
  required?: boolean;
}

const ShortTextComponent: FunctionComponent<ShortTextProps> = (props) => {
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
      <FormLabel required={props.required} htmlFor={inputId} className={styles.label}>
        {props.title}
      </FormLabel>
      <TextField id={inputId} value={inputValue} onChange={handleInputChange} />
      {unDirty && props.required && !inputValue && <FormHelperText>This field is required</FormHelperText>}
    </FormControl>
  );
};

export default ShortTextComponent;
