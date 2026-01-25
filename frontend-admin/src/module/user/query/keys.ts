import type { SearchParams } from "@/common/type";

export const UserQueryKey = {
  all: ["users"] as const,
  list: (params: SearchParams) => [...UserQueryKey["all"], params] as const,
  detail: (id: string) => [...UserQueryKey["all"], id] as const,
};
