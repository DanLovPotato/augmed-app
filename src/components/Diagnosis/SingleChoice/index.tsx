import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, Radio } from "@mui/material";
interface SingleChoiceData {
  question: string;
  options: string[];
}

interface SingleChoiceProps {
  data: SingleChoiceData;
}

const SingleChoiceComponent: React.FC<SingleChoiceProps> = ({ data }) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">data.questions</FormLabel>
      <FormGroup>
        {data.options.map((option, index) => (
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
