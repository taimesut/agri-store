import type { SearchParams } from "@/common/interface";

export const CategoryQueryKey = {
  all: ["categories"] as const,
  list: (params: SearchParams) => [...CategoryQueryKey["all"], params] as const,
  detail: (id: string) => [...CategoryQueryKey["all"], id] as const,
};
