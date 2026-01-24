import { slugify } from "@/common/util";
import z from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Tên không được rỗng"),
  handle: z.string(),
  parentId: z.string().optional(),
});

export const CategoryCreateShema = z.object({
  name: z.string().min(1, "Tên không được rỗng"),
  handle: z.string().transform((v) => {
    return slugify(v);
  }),
  parentId: z.string().optional(),
});

export const CategoryUpdateShema = z.object({
  name: z.string().min(1, "Tên không được rỗng").optional(),
  handle: z
    .string()
    .transform((v) => {
      const slug = slugify(v);
      return slug === "" ? undefined : slug;
    })
    .optional(),
  parentId: z.string().optional(),
});
