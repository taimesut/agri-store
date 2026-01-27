import { useMutation } from "@tanstack/react-query";
import { CategoryQueryKey } from "./keys";
import { queryClient } from "@/common/config/query-client";
import { CategoryApi } from "../api";
import type { CategoryCreateInput, CategoryUpdateInput } from "../schema";

export function CategoryMutationDelete() {
  return useMutation({
    mutationFn: (data: { id: string }) => CategoryApi.delete(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueryKey.all,
      });
    },
  });
}

export function CategoryMutationCreate() {
  return useMutation({
    mutationFn: (data: { payload: CategoryCreateInput }) =>
      CategoryApi.create(data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueryKey.all,
      });
    },
  });
}

export function CategoryMutationUpdate() {
  return useMutation({
    mutationFn: (data: { userId: string; payload: CategoryUpdateInput }) =>
      CategoryApi.update(data.userId, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueryKey.all,
      });
    },
  });
}
