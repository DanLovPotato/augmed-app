import React from "react";
import styles from "./index.module.scss";
import { ICase } from "../../types/case";

interface CaseCardProps {
  patientCase: ICase;
  onClick?: () => void;
}

const CaseCard = ({ patientCase, onClick }: CaseCardProps) => {
  return (
    <div className={styles.caseCardContainer} data-testid="case-card" onClick={onClick}>
      <div className={styles.caseIdContainer}>
        <span>Case: {patientCase.id}</span>
      </div>
      <div className={styles.chiefComplaintContainer}>
        <span>{patientCase.patient_chief_complaint}</span>
      </div>
      <div className={styles.patientInfoContainer}>
        <span>{patientCase.age + ", " + patientCase.sex}</span>
      </div>
    </div>
  );
};

export default CaseCard;
