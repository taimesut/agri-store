import { http } from "@/common/config/http";
import type { SearchParams, Meta } from "@/common/interface";
import type { UserCreateInput, UserUpdateInput, User } from "../schema";

export const UserApi = {
  findAll(params: SearchParams) {
    return http.get<{
      meta: Meta;
      users: User[];
    }>("/users", { params });
  },
  delete(id: string) {
    return http.delete(`/users/${id}`);
  },
  findOne(id: string) {
    return http.get<{ user: User }>(`/users/${id}`);
  },
  create(payload: UserCreateInput) {
    return http.post<{ user: User }>(`/users`, payload);
  },
  update(id: string, payload: UserUpdateInput) {
    return http.post<{ user: User }>(`/users/${id}`, payload);
  },
};
