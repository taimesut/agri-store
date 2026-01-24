import { useMutation } from "@tanstack/react-query";
import { TagQueryKey } from "./keys";
import type { SearchParams } from "@/common/interface";
import { queryClient } from "@/common/config/query-client";
import { TagApi } from "../api";
import type { TagCreateInput, TagUpdateInput } from "../schema";

interface DeleteOptions {
  params: SearchParams;
}
interface UpdateOptions {
  params: SearchParams;
}
interface CreateOptions {
  params: SearchParams;
}

export function TagMutationDelete({ params }: DeleteOptions) {
  return useMutation({
    mutationFn: (data: { id: string }) => TagApi.delete(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TagQueryKey.list(params),
      });
    },
  });
}

export function TagMutationCreate({ params }: CreateOptions) {
  return useMutation({
    mutationFn: (data: { payload: TagCreateInput }) => TagApi.create(data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TagQueryKey.list(params),
      });
    },
  });
}

export function TagMutationUpdate({ params }: UpdateOptions) {
  return useMutation({
    mutationFn: (data: { id: string; payload: TagUpdateInput }) =>
      TagApi.update(data.id, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TagQueryKey.list(params),
      });
    },
  });
}
