import type z from "zod";
import type { JwtPayloadSchema, LoginSchema } from "./schema";

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
