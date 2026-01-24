import { http } from "@/common/config/http";
import type { SearchParams, Meta } from "@/common/interface";
import type { CategoryCreateInput, CategoryUpdateInput, Category } from "../schema";

export const UserApi = {
  findAll(params: SearchParams) {
    return http.get<{
      meta: Meta;
      categories: Category[];
    }>("/categories", { params });
  },
  delete(id: string) {
    return http.delete(`/categories/${id}`);
  },
  findOne(id: string) {
    return http.get<{ category: Category }>(`/categories/${id}`);
  },
  create(payload: CategoryCreateInput) {
    return http.post<{ category: Category }>(`/categories`, payload);
  },
  update(id: string, payload: CategoryUpdateInput) {
    return http.post<{ category: Category }>(`/categories/${id}`, payload);
  },
};
