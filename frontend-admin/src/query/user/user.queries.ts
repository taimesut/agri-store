import { useQuery } from "@tanstack/react-query";
import { queryUserKey } from "./user.query-key";
import { UserApi } from "@/api/user/user.api";
import type { SearchParams } from "@/common/interface";

interface UseQueryUserListOptions {
  params: SearchParams;
}

export const useQueryUserList = ({ params }: UseQueryUserListOptions) =>
  useQuery({
    queryKey: queryUserKey.list(params),

    queryFn: ({ queryKey }) => {
      const [, query] = queryKey;
      return UserApi.findAll(query);
    },

    select: (res) => res.data,
  });
