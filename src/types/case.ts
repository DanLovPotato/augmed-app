export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export interface ICase {
  config_id: number;
  case_id: number;
  patient_chief_complaint: string;
  age: string; // Changed from number to string to match the backend
  gender: Gender; // Renamed from sex to gender and using the enum Sex
}

export interface CaseDetail {
  personName: string;
  caseNumber: string;
  details: TreeNode[];
  importantInfos: TreeNode[];
}

export interface TreeNode {
  key: string;
  values?: string[] | TreeNode[] | string;
  style?: {
    collapse?: boolean;
    highlight?: boolean;
  };
}
