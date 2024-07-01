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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    props.onInputChange(props.title, event.target.value);
  };

  return (
    <FormControl fullWidth className={styles.container} sx={{ m: 3, display: "block" }} variant="standard">
      <FormLabel required={props.required} className={styles.label}>
        {props.title}
      </FormLabel>
      <FormGroup className={styles.radioGroup}>
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Radio checked={selectedValue === option} onChange={handleInputChange} value={option} />}
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default SingleChoiceComponent;
