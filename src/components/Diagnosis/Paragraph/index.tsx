import React, { FunctionComponent, useState } from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";

interface ParagraphProps {
  title: string;
}

const ParagraphComponent: FunctionComponent<ParagraphProps> = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>{props.title}</FormLabel>
        <TextField multiline rows={4} fullWidth value={inputValue} onChange={handleInputChange} />
      </FormControl>
    </>
  );
};

export default ParagraphComponent;
