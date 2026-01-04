import type { LoginRequest } from "../utils/types";
import instanceAxios from "./axios";

export const AuthApi = {
  Login: async (payload: LoginRequest) => {
    return instanceAxios.post("/auth/login", payload);
  },
  GetCurrentUser: async () => {
    return instanceAxios.post("/auth/me");
  },
  Logout: async () => {
    return instanceAxios.post("/auth/logout");
  },
};
