import { http } from "@/common/config/http";
import type { Meta } from "@/common/interface/meta.interface";
import type { SearchParams } from "@/common/interface";
import type { User } from "@/schema/user/user.schema";
import type { CreateUserInput } from "@/schema/user/create-user.schema";

export const UserApi = {
  findAll(params: SearchParams) {
    return http.get<{
      meta: Meta;
      users: User[];
    }>("/users", { params });
  },
  delete(userId: string) {
    return http.delete(`/users/${userId}`);
  },
  findOne(id: string) {
    return http.get<{ user: User }>(`/users/${id}`);
  },
  create(payload: CreateUserInput) {
    return http.post<{ user: User }>(`/users`, payload);
  },
  // update(userId: string, payload: UpdateUser) {
  //   return http.post<{ user: User }>(`/users/${userId}`, payload);
  // },
};
