import React, { FunctionComponent, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, Radio, FormHelperText } from "@mui/material";
import styles from "./index.module.scss";

export interface SingleChoiceProps {
  title: string;
  options: string[];
  onInputChange: (title: string, value: string) => void;
  required?: boolean;
}

const SingleChoiceComponent: FunctionComponent<SingleChoiceProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [unDirty, setUnDirty] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnDirty(true);
    setSelectedValue(event.target.value);
    props.onInputChange(props.title, event.target.value);
  };

  return (
    <FormControl
      className={styles.container}
      sx={{ m: 3, display: "block" }}
      component="fieldset"
      variant="standard"
      error={unDirty && props.required && !selectedValue}
    >
      <FormLabel component="legend" required={props.required}>
        {props.title}
      </FormLabel>
      <FormGroup>
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Radio checked={selectedValue === option} onChange={handleInputChange} value={option} />}
            label={option}
          />
        ))}
      </FormGroup>
      {unDirty && props.required && !selectedValue && <FormHelperText>This field is required</FormHelperText>}
    </FormControl>
  );
};

export default SingleChoiceComponent;
