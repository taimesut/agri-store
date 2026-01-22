import type { SearchParams } from "@/common/interface";

export const queryUserKey = {
  all: ["users"] as const,
  list: (params: SearchParams) => [...queryUserKey["all"], params] as const,
  detail: (id: string) => [...queryUserKey["all"], "detail", id] as const,
};
