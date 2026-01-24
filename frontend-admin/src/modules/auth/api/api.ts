import { http } from "@/common/config/http";
import type { AuthUser, LoginInput } from "../schema";

export const AuthApi = {
  login(payload: LoginInput) {
    return http.post("/auth/login", payload);
  },
  me() {
    return http.get<AuthUser>("/auth/me");
  },
  logout() {
    return http.post("/auth/logout");
  },
};
