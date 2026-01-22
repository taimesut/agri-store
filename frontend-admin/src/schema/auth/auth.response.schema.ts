import z from "zod";

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
