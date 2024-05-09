import React from "react";
import styles from "./index.module.scss";
import { ICase } from "../../types/case";
import path from "../../routes/path";
import { generatePath, useNavigate } from "react-router-dom";

interface CaseCardProps {
  className?: string;
  patientCase: ICase;
}

const CaseCard = ({ className, patientCase }: CaseCardProps) => {
  const nav = useNavigate();
  const handleOnClick = () => nav(generatePath(path.case, { caseConfigId: patientCase.config_id }));
  return (
    <div className={`${styles.caseCardContainer} ${className} `} onClick={handleOnClick}>
      <div className={styles.caseIdContainer}>
        <span>Case: {patientCase.case_id}</span>
      </div>
      <div className={styles.chiefComplaintContainer}>
        <span>{patientCase.patient_chief_complaint}</span>
      </div>
      <div className={styles.patientInfoContainer}>
        <span>{patientCase.age + ", " + patientCase.gender}</span>
      </div>
    </div>
  );
};

export default CaseCard;
