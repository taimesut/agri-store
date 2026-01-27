import { useMutation } from "@tanstack/react-query";
import { TagQueryKey } from "./keys";
import { queryClient } from "@/common/config/query-client";
import { TagApi } from "../api";
import type { TagCreateInput, TagUpdateInput } from "../schema";

export function TagMutationDelete() {
  return useMutation({
    mutationFn: (data: { id: string }) => TagApi.delete(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TagQueryKey.all,
      });
    },
  });
}

export function TagMutationCreate() {
  return useMutation({
    mutationFn: (data: { payload: TagCreateInput }) =>
      TagApi.create(data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TagQueryKey.all,
      });
    },
  });
}

export function TagMutationUpdate() {
  return useMutation({
    mutationFn: (data: { userId: string; payload: TagUpdateInput }) =>
      TagApi.update(data.userId, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TagQueryKey.all,
      });
    },
  });
}
