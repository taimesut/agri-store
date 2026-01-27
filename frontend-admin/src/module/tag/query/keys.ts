import type { SearchParams } from "@/common/type";

export const TagQueryKey = {
  all: ["tags"] as const,
  list: (params: SearchParams) => [...TagQueryKey["all"], params] as const,
  detail: (id: string) => [...TagQueryKey["all"], id] as const,
};
