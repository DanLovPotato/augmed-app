import React, { FunctionComponent } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, FormControl, FormLabel } from "@mui/material";

interface MultipleChoiceProps {
  question: string;
  options: string[];
}

const MultipleChoiceComponent: FunctionComponent<MultipleChoiceProps> = (props) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{props.question}</FormLabel>
      <FormGroup>
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox checked={selectedValue === option} onChange={handleChange} value={option} />}
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default MultipleChoiceComponent;
