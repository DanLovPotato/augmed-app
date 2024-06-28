import React, { FunctionComponent } from "react";

import MultipleChoiceComponent from "./MultipleChoice";
import SingleChoiceComponent from "./SingleChoice";
import ShortTextComponent from "./ShortText";
import ParagraphComponent from "./Paragraph";
import { AnswerConfigList } from "../../types/answer";

export interface DiagnosisProps {
  configList: AnswerConfigList;
  onInputChange: (title: string, value: string | string[]) => void;
}

const Diagnosis: FunctionComponent<DiagnosisProps> = (props) => {
  return (
    <div>
      {props.configList.map((config, index) => {
        switch (config.type) {
          case "MultipleChoice":
            return (
              <MultipleChoiceComponent
                key={index}
                title={config.title}
                options={config.options}
                onInputChange={props.onInputChange}
              />
            );
          case "SingleChoice":
            return (
              <SingleChoiceComponent
                key={index}
                title={config.title}
                options={config.options}
                onInputChange={props.onInputChange}
              />
            );
          case "Text":
            return <ShortTextComponent key={index} title={config.title} onInputChange={props.onInputChange} />;
          case "Paragraph":
            return <ParagraphComponent key={index} title={config.title} onInputChange={props.onInputChange} />;
        }
      })}
    </div>
  );
};
export default Diagnosis;
