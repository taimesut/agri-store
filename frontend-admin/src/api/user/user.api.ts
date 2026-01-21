import { http } from "@/common/config/http";
import type { PaginationQuery } from "@/common/interface";
import type { UserDTO } from "./user.inteface";
import type { Meta } from "@/common/interface/meta";

export const UserApi = {
  findAll(query: PaginationQuery) {
    return http.get<{
      meta: Meta;
      users: UserDTO[];
    }>("/users", { params: query });
  },
};
