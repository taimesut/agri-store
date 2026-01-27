import z from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  handle: z.string(),
  parentId: z.string().nullable(),
  createdAt: z.string(),
});

export const CategoryCreateShema = z.object({
  name: z.string(),
  handle: z.string(),
  parentId: z.string().optional(),
});

export const CategoryUpdateShema = z.object({
  name: z.string().optional(),
  handle: z.string().optional(),
  parentId: z.string().optional(),
});
