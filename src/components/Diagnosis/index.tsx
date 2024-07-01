import React, { FunctionComponent } from "react";

import MultipleChoiceComponent from "./MultipleChoice";
import SingleChoiceComponent from "./SingleChoice";
import ShortTextComponent from "./ShortText";
import ParagraphComponent from "./Paragraph";
import { AnswerConfigList } from "../../types/answer";
import styles from "../../pages/Home/index.module.scss";
import { UpcomingTwoTone } from "@mui/icons-material";

export interface DiagnosisProps {
  configList: AnswerConfigList;
  onInputChange: (title: string, value: string | string[]) => void;
}

const Diagnosis: FunctionComponent<DiagnosisProps> = (props) => {
  return (
    <div>
      {props.configList.length === 0 ? (
        <div className={styles.empty}>
          <UpcomingTwoTone className={styles.icon} />
          <span className={styles.emptyText}>
            Failed to show Answer page.Please contact <a href="mailto:dhep.lab@gmail.com">dhep.lab@gmail.com</a> to
            configure answer page.
          </span>
        </div>
      ) : (
        props.configList.map((config, index) => {
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
        })
      )}
    </div>
  );
};
export default Diagnosis;
