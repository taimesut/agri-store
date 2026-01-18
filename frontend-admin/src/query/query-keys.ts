export const workspaceQueryKeys = {
  all: ['workspace'] as const,
  list: () => [...workspaceQueryKeys.all, 'list'] as const,
  detail: (id: string) =>
    [...workspaceQueryKeys.all, 'detail', id] as const,
};