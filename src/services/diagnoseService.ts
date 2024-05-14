import { DiagnoseFormData } from "../pages/Diagnose";
import { request } from "./api";

export const saveDiagnose = async (caseConfigId: string, diagnoseFormData: DiagnoseFormData) => {
  return await request(`/diagnose/${caseConfigId}`, {
    method: "POST",
    data: diagnoseFormData,
  });
};
