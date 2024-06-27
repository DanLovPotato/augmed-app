import React, { FunctionComponent, useState } from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";

export interface ParagraphProps {
  title: string;
  onInputChange: (title: string, value: string) => void;
}

const ParagraphComponent: FunctionComponent<ParagraphProps> = (props) => {
  const [inputValue, setInputValue] = useState("");
  const inputId = `input-${props.title.replace(/ /g, "-")}`;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    props.onInputChange(props.title, event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <FormLabel htmlFor={inputId}>{props.title}</FormLabel>
        <TextField id={inputId} multiline rows={4} fullWidth value={inputValue} onChange={handleInputChange} />
      </FormControl>
    </>
  );
};

export default ParagraphComponent;
