import { httpInstance } from './http.instance';

httpInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);
