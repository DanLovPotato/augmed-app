import React, { FunctionComponent, useState } from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ShortTextProps {
  title: string;
}

const ShortTextComponent: FunctionComponent<ShortTextProps> = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <>
      <FormControl fullWidth>
        <FormLabel>{props.title}</FormLabel>
        <TextField value={inputValue} onChange={handleInputChange} />
      </FormControl>
    </>
  );
};

export default ShortTextComponent;
