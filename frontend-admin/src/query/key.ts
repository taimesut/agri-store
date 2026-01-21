import type { PaginationQuery } from "@/common/interface";

export const workspaceQueryKeys = {
  all: ["workspace"] as const,
  list: () => [...workspaceQueryKeys.all, "list"] as const,
  detail: (id: string) => [...workspaceQueryKeys.all, "detail", id] as const,
};

export const userQueryKeys = {
  list: (params: PaginationQuery) => ["users", params] as const,
  detail: (id: string) => ["users", "detail", id] as const,
};
