import { http } from "@/common/config/http";
import type { JwtPayload, LoginInput } from "../schema/input";

export const AuthApi = {
  login(payload: LoginInput) {
    return http.post("/auth/login", payload);
  },
  me() {
    return http.get<JwtPayload>("/auth/me");
  },
  logout() {
    return http.post("/auth/logout");
  },
};
