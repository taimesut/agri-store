import axios from 'axios';
import { appConfig } from '../app.config';

export const httpInstance = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 10000,
  withCredentials: true,
});
