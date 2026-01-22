// forms/login.schema.ts
import { z } from "zod";

export const CreateUserShema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Ít nhất 8 ký tự"),
  fullName: z.string().min(8, "Ít nhất 8 ký tự"),
});

export type CreateUserInput = z.infer<typeof CreateUserShema>;
