import React, { FunctionComponent, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, FormControl, FormLabel } from "@mui/material";

interface MultipleChoiceProps {
  question: string;
  options: string[];
}

const MultipleChoiceComponent: FunctionComponent<MultipleChoiceProps> = ({ question, options }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedValues((prev) => (prev.includes(option) ? prev.filter((value) => value !== option) : [...prev, option]));
  };

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{question}</FormLabel>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox checked={selectedValues.includes(option)} onChange={handleChange} value={option} />}
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default MultipleChoiceComponent;
