import { instance } from "./api";
import { AxiosResponse } from "axios";

export function requestResetLink(email: string): Promise<AxiosResponse<string>> {
  return instance.post("/auth/reset-password-request", { email });
}

export const signup = (email: string, password: string): Promise<AxiosResponse<string>> => {
  return instance.post("/auth/signup", {
    email,
    password,
  });
};

export const login = (email: string, password: string): Promise<AxiosResponse<string>> => {
  return instance.post("/auth/login", {
    email,
    password,
  });
};

export const resetPassword = (resetToken: string, password: string): Promise<AxiosResponse<string>> => {
  return instance.post("/auth/reset-password", {
    resetToken,
    password,
  });
};
