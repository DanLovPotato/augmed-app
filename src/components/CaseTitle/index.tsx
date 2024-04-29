import React from "react";

import styles from "./index.module.scss";
import { Divider } from "@mui/material";

export type CaseTitleProps = {
  name: string;
  case?: string;
  suffix?: React.ReactNode;
};

const CaseTitle = (props: CaseTitleProps) => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.name}>{props.name}</div>
          <div className={styles.case}>{props.case}</div>
        </div>
        {props.suffix}
      </div>
      <Divider />
    </>
  );
};

export default CaseTitle;
