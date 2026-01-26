import { useMutation } from "@tanstack/react-query";
import { UserQueryKey } from "./keys";
import { queryClient } from "@/common/config/query-client";
import { UserApi } from "../api";
import type { UserCreateInput, UserUpdateInput } from "../schema";

export function UserMutationDelete() {
  return useMutation({
    mutationFn: (data: { id: string }) => UserApi.delete(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UserQueryKey.all,
      });
    },
  });
}

export function UserMutationCreate() {
  return useMutation({
    mutationFn: (data: { payload: UserCreateInput }) =>
      UserApi.create(data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UserQueryKey.all,
      });
    },
  });
}

export function UserMutationUpdate() {
  return useMutation({
    mutationFn: (data: { userId: string; payload: UserUpdateInput }) =>
      UserApi.update(data.userId, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UserQueryKey.all,
      });
    },
  });
}
