import { request } from "./api";
import { CaseDetail, ICase } from "../types/case";

export const getCaseList = async () => {
  return await request<{ data: ICase[] }>(`/cases`, {
    method: "GET",
  });
};

export const getCaseDetail = async (caseConfigId: string) => {
  return await request<{ data: CaseDetail }>(`/case-reviews/${caseConfigId}`, {
    method: "GET",
  });
};
