import { useQuery } from "@tanstack/react-query";
import { UserQueryKey } from "./keys";
import type { SearchParams } from "@/common/type";
import { UserApi } from "../api";

interface ListOptions {
  params: SearchParams;
}

interface DetailOptions {
  id: string;
}

export function UserQueryList({ params }: ListOptions) {
  return useQuery({
    queryKey: UserQueryKey.list(params),

    queryFn: ({ queryKey }) => {
      const [, query] = queryKey;
      return UserApi.findAll(query);
    },

    select: (res) => res.data,
  });
}

export function UserQueryDetail({ id }: DetailOptions) {
  return useQuery({
    queryKey: UserQueryKey.detail(id),

    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return UserApi.findOne(id);
    },

    select: (res) => res.data,
  });
}
