import type { LoginRequest } from "../utils/types";
import instanceAxios from "./axios";

export async function LoginApi(payload: LoginRequest) {
  return instanceAxios.post("/auth/login", payload);
}

export async function ProfileApi() {
  return instanceAxios.post("/auth/me");
}
