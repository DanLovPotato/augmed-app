import React, { FunctionComponent, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, FormControl, FormLabel } from "@mui/material";

export interface MultipleChoiceProps {
  title: string;
  options: string[];
  onInputChange: (title: string, value: string[]) => void;
}

const MultipleChoiceComponent: FunctionComponent<MultipleChoiceProps> = (props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    setSelectedValues(newSelectedValues);

    props.onInputChange(props.title, newSelectedValues);
  };

  return (
    <FormControl sx={{ m: 3, display: "block" }} component="fieldset" variant="standard">
      <FormLabel component="legend">{props.title}</FormLabel>
      <FormGroup sx={{ flexDirection: "column" }}>
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox checked={selectedValues.includes(option)} onChange={handleInputChange} value={option} />}
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default MultipleChoiceComponent;
