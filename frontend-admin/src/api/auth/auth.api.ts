import { http } from "@/common/config/http";
import type { LoginDTO, PayloadAuth } from "./auth.interfaces";

export const AuthApi = {
  login(payload: LoginDTO) {
    return http.post("/auth/login", payload);
  },
  me() {
    return http.get<PayloadAuth>("/auth/me");
  },
  logout() {
    return http.post("/auth/logout");
  },
};
