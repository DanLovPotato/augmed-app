import React, { FunctionComponent, useState } from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";

export interface ShortTextProps {
  title: string;
  onInputChange: (title: string, value: string) => void;
}

const ShortTextComponent: FunctionComponent<ShortTextProps> = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    props.onInputChange(props.title, event.target.value);
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
