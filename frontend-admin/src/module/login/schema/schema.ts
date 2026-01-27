import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(8, "Ít nhất 8 ký tự"),
});

export const JwtPayloadSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  createdAt: z.string(),
});
