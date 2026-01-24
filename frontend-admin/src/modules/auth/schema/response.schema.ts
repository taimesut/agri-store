import z from "zod";

export const AuthLoginResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
});

export type AuthUser = z.infer<typeof AuthLoginResponseSchema>;
