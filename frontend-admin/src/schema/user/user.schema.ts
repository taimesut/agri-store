import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  fullName: z.string(),
  phone: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
