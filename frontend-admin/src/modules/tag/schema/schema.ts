import z from "zod";

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const TagCreateShema = z.object({
  name: z.string(),
});

export const TagUpdateShema = z.object({
  name: z.string(),
});
