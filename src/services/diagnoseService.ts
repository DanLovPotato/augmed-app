import { DiagnoseFormData } from "../pages/Diagnose";
import { request } from "./api";
import { AnswerPageConfigResponse } from "../types/answer";

export const saveDiagnose = async (caseConfigId: string, diagnoseFormData: DiagnoseFormData) => {
  return await request(`/config/answer`, {
    method: "POST",
    data: diagnoseFormData,
  });
};

export const getAnswerPageConfig = async () => {
  return await request<{ data: AnswerPageConfigResponse }>(`/config/answer `, {
    method: "GET",
  });
};
