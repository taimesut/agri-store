import { useQuery } from "@tanstack/react-query";
import { TagQueryKey } from "./keys";
import type { SearchParams } from "@/common/type";
import { TagApi } from "../api";

interface ListOptions {
  params: SearchParams;
}

interface DetailOptions {
  id: string;
}

export function TagQueryList({ params }: ListOptions) {
  return useQuery({
    queryKey: TagQueryKey.list(params),

    queryFn: ({ queryKey }) => {
      const [, query] = queryKey;
      return TagApi.findAll(query);
    },

    select: (res) => res.data,
  });
}

export function TagQueryDetail({ id }: DetailOptions) {
  return useQuery({
    queryKey: TagQueryKey.detail(id),

    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return TagApi.findOne(id);
    },

    select: (res) => res.data,
  });
}
