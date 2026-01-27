import { useQuery } from "@tanstack/react-query";
import { CategoryQueryKey } from "./keys";
import type { SearchParams } from "@/common/type";
import { CategoryApi } from "../api";

interface ListOptions {
  params: SearchParams;
}

interface DetailOptions {
  id: string;
}

export function CategoryQueryList({ params }: ListOptions) {
  return useQuery({
    queryKey: CategoryQueryKey.list(params),

    queryFn: ({ queryKey }) => {
      const [, query] = queryKey;
      return CategoryApi.findAll(query);
    },

    select: (res) => res.data,
  });
}

export function CategoryQueryDetail({ id }: DetailOptions) {
  return useQuery({
    queryKey: CategoryQueryKey.detail(id),

    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return CategoryApi.findOne(id);
    },

    select: (res) => res.data,
  });
}
