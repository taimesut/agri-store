import { useMutation } from "@tanstack/react-query";
import { UserQueryKey } from "./keys";
import type { SearchParams } from "@/common/interface";
import { queryClient } from "@/common/config/query-client";
import { UserApi } from "../api";
import type { UserCreateInput, UserUpdateInput } from "../schema";

interface DeleteOptions {
  params: SearchParams;
}
interface UpdateOptions {
  params: SearchParams;
}
interface CreateOptions {
  params: SearchParams;
}

export function UserMutationDelete({ params }: DeleteOptions) {
  return useMutation({
    mutationFn: (data: { id: string }) => UserApi.delete(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UserQueryKey.list(params),
      });
    },
  });
}

export function UserMutationCreate({ params }: CreateOptions) {
  return useMutation({
    mutationFn: (data: { payload: UserCreateInput }) => UserApi.create(data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UserQueryKey.list(params),
      });
    },
  });
}

export function UserMutationUpdate({ params }: UpdateOptions) {
  return useMutation({
    mutationFn: (data: { userId: string; payload: UserUpdateInput }) =>
      UserApi.update(data.userId, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UserQueryKey.list(params),
      });
    },
  });
}
