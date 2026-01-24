// forms/login.schema.ts
import { z } from "zod";

export const AuthLoginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(8, "Ít nhất 8 ký tự"),
});

export type LoginInput = z.infer<typeof AuthLoginSchema>;
