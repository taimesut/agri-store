import type { AxiosRequestConfig } from 'axios';
import { httpInstance } from './http.instance';

export const http = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return httpInstance.get<T>(url, config);
  },

  post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) {
    return httpInstance.post<T>(url, data, config);
  },

  put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) {
    return httpInstance.put<T>(url, data, config);
  },

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return httpInstance.delete<T>(url, config);
  },
};
