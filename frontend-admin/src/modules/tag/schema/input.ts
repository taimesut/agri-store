import type z from "zod";
import type { TagCreateShema, TagSchema, TagUpdateShema } from "./schema";

export type TagUpdateInput = z.infer<typeof TagUpdateShema>;
export type TagCreateInput = z.infer<typeof TagCreateShema>;
export type Tag = z.infer<typeof TagSchema>;
