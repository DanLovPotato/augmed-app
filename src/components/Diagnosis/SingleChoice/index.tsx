import React, { FunctionComponent } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, Radio } from "@mui/material";

interface SingleChoiceProps {
  title: string;
  options: string[];
}

const SingleChoiceComponent: FunctionComponent<SingleChoiceProps> = (props) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl sx={{ m: 3, display: "block" }} component="fieldset" variant="standard">
      <FormLabel component="legend">{props.title}</FormLabel>
      <FormGroup>
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Radio checked={selectedValue === option} onChange={handleChange} value={option} />}
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default SingleChoiceComponent;
