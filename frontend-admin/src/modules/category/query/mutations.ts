import { useMutation } from "@tanstack/react-query";
import { CategoryQueryKey } from "./keys";
import type { SearchParams } from "@/common/interface";
import { queryClient } from "@/common/config/query-client";
import { UserApi } from "../api";
import type { CategoryCreateInput, CategoryUpdateInput } from "../schema";

interface DeleteOptions {
  params: SearchParams;
}
interface UpdateOptions {
  params: SearchParams;
}
interface CreateOptions {
  params: SearchParams;
}

export function CategoryMutationDelete({ params }: DeleteOptions) {
  return useMutation({
    mutationFn: (data: { id: string }) => UserApi.delete(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueryKey.list(params),
      });
    },
  });
}

export function CategoryMutationCreate({ params }: CreateOptions) {
  return useMutation({
    mutationFn: (data: { payload: CategoryCreateInput }) => UserApi.create(data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueryKey.list(params),
      });
    },
  });
}

export function CategoryMutationUpdate({ params }: UpdateOptions) {
  return useMutation({
    mutationFn: (data: { userId: string; payload: CategoryUpdateInput }) =>
      UserApi.update(data.userId, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueryKey.list(params),
      });
    },
  });
}
