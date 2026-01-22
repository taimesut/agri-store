import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@/api/user/user.api";
import { queryClient } from "../client";
import { queryUserKey } from "./user.query-key";
import type { SearchParams } from "@/common/interface";
import type { CreateUserInput } from "@/schema/user/create-user.schema";

interface MutationUserDeleteOptions {
  params: SearchParams;
}
// interface MutationUserUpdateOptions {
//   params: SearchParams;
// }
interface MutationUserCreateOptions {
  params: SearchParams;
}

export function useMutationUserDelete({ params }: MutationUserDeleteOptions) {
  return useMutation({
    mutationFn: (data: { id: string }) => UserApi.delete(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryUserKey.list(params),
      });
    },
  });
}

export function useMutationUserCreate({ params }: MutationUserCreateOptions) {
  return useMutation({
    mutationFn: (data: { payload: CreateUserInput }) => UserApi.create(data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryUserKey.list(params),
      });
    },
  });
}

// export function useMutationUserUpdate({ params }: MutationUserUpdateOptions) {
//   return useMutation({
//     mutationFn: (data: { userId: string; payload: UpdateUser }) =>
//       UserApi.update(data.userId, data.payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: queryUserKey.list(params),
//       });
//     },
//   });
// }
