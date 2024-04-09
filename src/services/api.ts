import type { AxiosPromise, AxiosRequestConfig } from "axios";
import axios from "axios";
import { redirect } from "react-router-dom";

import path from "../routes/path";

const baseUrl = "/api";
const tokenKey = "token";
export const storeToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenKey) || "";
};

export const instance = axios.create({
  baseURL: baseUrl, // 设置基本的 API 地址
  timeout: 5000, // 设置请求超时时间
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const newToken = response.headers["authorization"] ?? response.headers["Authorization"];
    if (newToken) {
      storeToken(newToken.split(" ")[1]);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        redirect(path.login);
      } else if (error.response.status === 404) {
        console.log("Not found");
      } else if (error.response.status >= 500) {
        const bizError = error.response?.data?.error;
        if (bizError) {
          return Promise.reject(bizError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export async function requestWithPrefix<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosPromise<T>> {
  return await instance({
    url: `${url}`,
    ...config,
  });
}

export async function request<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosPromise<T>> {
  const response: Promise<AxiosPromise<T>> = requestWithPrefix(url, config);
  return await response;
}
