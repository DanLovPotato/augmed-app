import { request } from "./api";
import { AnswerPageConfigResponse } from "../types/answer";
import { AnswerFormData } from "../state";

export const saveAnswer = async (taskId: string, answerFormData: AnswerFormData, answerConfigId: string) => {
  return await request(`/answer/${taskId}`, {
    method: "POST",
    data: {
      answer: answerFormData,
      answerConfigId: answerConfigId,
    },
  });
};
export const getAnswerPageConfig = async () => {
  return await request<{ data: AnswerPageConfigResponse }>(`/config/answer `, {
    method: "GET",
  });
};
