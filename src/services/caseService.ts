import { request } from "./api";
import { ICase } from "../types/case";

export const getCaseList = async () => {
  return await request<ICase[]>(`/case`, {
    method: "GET",
  });
};
