export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export interface ICase {
  configId: number;
  caseId: number;
  patientChiefComplaint: string;
  age: string; // Changed from number to string to match the backend
  gender: Gender; // Renamed from sex to gender and using the enum Sex
}
