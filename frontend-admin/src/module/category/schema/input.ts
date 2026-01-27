import type z from "zod";
import type { CategoryCreateShema, CategorySchema, CategoryUpdateShema } from "./schema";

export type CategoryUpdateInput = z.infer<typeof CategoryUpdateShema>;
export type CategoryCreateInput = z.infer<typeof CategoryCreateShema>;
export type Category = z.infer<typeof CategorySchema>;
