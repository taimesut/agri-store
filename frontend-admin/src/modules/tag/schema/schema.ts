import z from "zod";

export const TagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Ít nhất 1 ký tự"),
});

export const TagCreateShema = z.object({
  name: z.string().min(1, "Ít nhất 1 ký tự"),
});

export const TagUpdateShema = z.object({
  name: z.string().min(1, "Ít nhất 1 ký tự"),
});
