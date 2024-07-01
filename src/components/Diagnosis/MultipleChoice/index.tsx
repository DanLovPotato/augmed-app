import React, { FunctionComponent, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, FormControl, FormHelperText, FormLabel } from "@mui/material";
import styles from "./index.module.scss";

export interface MultipleChoiceProps {
  title: string;
  options: string[];
  onInputChange: (title: string, value: string[]) => void;
  required?: boolean;
}

const MultipleChoiceComponent: FunctionComponent<MultipleChoiceProps> = (props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [unDirty, setUnDirty] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    setSelectedValues(newSelectedValues);
    setUnDirty(true);

    props.onInputChange(props.title, newSelectedValues);
  };

  return (
    <FormControl
      fullWidth
      sx={{ m: 3, display: "block" }}
      variant="standard"
      className={styles.container}
      error={unDirty && props.required && selectedValues.length === 0}
    >
      <FormLabel required={props.required} className={styles.label}>
        {props.title}
      </FormLabel>
      <FormGroup sx={{ flexDirection: "column" }} className={styles.checkBoxGroup}>
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox checked={selectedValues.includes(option)} onChange={handleInputChange} value={option} />}
            label={option}
          />
        ))}
      </FormGroup>
      {unDirty && props.required && selectedValues.length === 0 && (
        <FormHelperText>This field is required</FormHelperText>
      )}
    </FormControl>
  );
};

export default MultipleChoiceComponent;
