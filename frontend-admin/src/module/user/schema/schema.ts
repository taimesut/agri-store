import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  fullName: z.string(),
  phone: z.string().optional(),
  createdAt: z.string(),
});

export const UserCreateShema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Ít nhất 8 ký tự"),
  fullName: z.string().min(8, "Ít nhất 8 ký tự"),
  phone: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine(
      (v) => v === undefined || v.length >= 9,
      "Số điện thoại không hợp lệ",
    ),
});

export const UserUpdateShema = z.object({
  password: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine((v) => v === undefined || v.length >= 8, "Ít nhất 8 ký tự"),

  fullName: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine((v) => v === undefined || v.length >= 8, "Ít nhất 8 ký tự"),

  phone: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine(
      (v) => v === undefined || v.length >= 9,
      "Số điện thoại không hợp lệ",
    ),
});
