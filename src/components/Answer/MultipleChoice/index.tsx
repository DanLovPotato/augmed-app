import React, { FunctionComponent, useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, FormControl, FormHelperText, FormLabel } from "@mui/material";
import styles from "./index.module.scss";

export interface MultipleChoiceProps {
  title: string;
  options: string[];
  onInputChange: (title: string, value: string[]) => void;
  required?: boolean;
  value: string[];
}

const MultipleChoiceComponent: FunctionComponent<MultipleChoiceProps> = (props) => {
  const [unDirty, setUnDirty] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const newSelectedValues = props.value.includes(option)
      ? props.value.filter((value) => value !== option)
      : [...props.value, option];

    setUnDirty(true);

    props.onInputChange(props.title, newSelectedValues);
  };

  return (
    <FormControl
      fullWidth
      sx={{ m: 3, display: "block" }}
      variant="standard"
      className={styles.container}
      error={unDirty && props.required && props.value.length === 0}
    >
      <FormLabel required={props.required} className={styles.label}>
        {props.title}
      </FormLabel>
      <FormGroup sx={{ flexDirection: "column" }} className={styles.checkBoxGroup}>
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={props.value.includes(option)}
                onChange={handleInputChange}
                value={option}
                data-testid={option}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
      {unDirty && props.required && props.value.length === 0 && <FormHelperText>This field is required</FormHelperText>}
    </FormControl>
  );
};

export default MultipleChoiceComponent;
