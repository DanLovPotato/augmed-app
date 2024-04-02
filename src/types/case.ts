export enum Sex {
  MALE = "Male",
  FEMALE = "Female",
}

export interface ICase {
  id: string;
  patient_chief_complaint: string;
  age: number;
  sex: Sex;
}
