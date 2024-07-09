import React from "react";
import MultipleChoiceComponent from "./MultipleChoice";
import SingleChoiceComponent from "./SingleChoice";
import ShortTextComponent from "./ShortText";
import ParagraphComponent from "./Paragraph";
import { AnswerConfigList } from "../../types/answer";

export interface DiagnosisProps {
  configList: AnswerConfigList;
  onInputChange: (title: string, value: string | string[]) => void;
  answerFormData: Record<string, string | string[]>;
}

const Answer: React.FC<DiagnosisProps> = ({ configList, onInputChange, answerFormData }) => {
  return (
    <div>
      {configList.map((config, index) => {
        const value = answerFormData[config.title] || "";

        switch (config.type) {
          case "MultipleChoice":
            return (
              <MultipleChoiceComponent
                key={index}
                title={config.title}
                options={config.options}
                onInputChange={onInputChange}
                required={config.required}
                value={value as string[]}
              />
            );
          case "SingleChoice":
            return (
              <SingleChoiceComponent
                key={index}
                title={config.title}
                options={config.options}
                onInputChange={onInputChange}
                required={config.required}
                value={value as string}
              />
            );
          case "Text":
            return (
              <ShortTextComponent
                key={index}
                title={config.title}
                onInputChange={onInputChange}
                required={config.required}
                value={value as string}
              />
            );
          case "Paragraph":
            return (
              <ParagraphComponent
                key={index}
                title={config.title}
                onInputChange={onInputChange}
                required={config.required}
                value={value as string}
              />
            );
        }
      })}
    </div>
  );
};

export default Answer;
