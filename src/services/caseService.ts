import { request } from "./api";
import { ICase } from "../types/case";
import { TreeNode } from "../pages/Case";

export const getCaseList = async () => {
  return await request<ICase[]>(`/case`, {
    method: "GET",
  });
};

export const getCaseDetail = async (caseId: string, configId: string) => {
  return await request<{ data: TreeNode[] }>(`/cases/${caseId}?config=${configId}`, {
    method: "GET",
  });
};
