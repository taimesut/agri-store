import type z from "zod";
import type { UserCreateShema, UserSchema, UserUpdateShema } from "./schema";

export type UserUpdateInput = z.infer<typeof UserUpdateShema>;
export type UserCreateInput = z.infer<typeof UserCreateShema>;
export type User = z.infer<typeof UserSchema>;
