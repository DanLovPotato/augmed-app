import { AnswerFormData } from "../pages/Diagnose";
import { request } from "./api";
import { AnswerPageConfigResponse } from "../types/answer";

export const saveDiagnose = async (caseConfigId: string, answerFormData: AnswerFormData) => {
  return await request(`/config/answer`, {
    method: "POST",
    data: answerFormData,
  });
};

export const getAnswerPageConfig = async () => {
  return await request<{ data: AnswerPageConfigResponse }>(`/config/answer `, {
    method: "GET",
  });
};
