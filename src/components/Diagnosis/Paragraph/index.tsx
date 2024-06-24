import React, { FunctionComponent, useState } from "react";
import { TextField } from "@mui/material";

interface ParagraphProps {
  question: string;
}

const ParagraphComponent: FunctionComponent<ParagraphProps> = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return <TextField label={props.question} value={inputValue} onChange={handleInputChange} />;
};

export default ParagraphComponent;
