import { request } from "./api";
import { ICase } from "../types/case";
import { TreeNode } from "../pages/Case";

export const getCaseList = async () => {
  return await request<{ data: ICase[] }>(`/cases`, {
    method: "GET",
  });
};

export const getCaseDetail = async (caseId: number, configId: number) => {
  return await request<{ data: { personName: string; caseNumber: string; details: TreeNode[] } }>(
    `/cases/${caseId}?config=${configId}`,
    {
      method: "GET",
    },
  );
};
