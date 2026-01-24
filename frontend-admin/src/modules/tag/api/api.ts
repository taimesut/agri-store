import { http } from "@/common/config/http";
import type { SearchParams, Meta } from "@/common/interface";
import type { TagCreateInput, TagUpdateInput, Tag } from "../schema";

export const TagApi = {
  findAll(params: SearchParams) {
    return http.get<{
      meta: Meta;
      tags: Tag[];
    }>("/tags", { params });
  },
  delete(id: string) {
    return http.delete(`/tags/${id}`);
  },
  findOne(id: string) {
    return http.get<{ tag: Tag }>(`/tags/${id}`);
  },
  create(payload: TagCreateInput) {
    return http.post<{ tag: Tag }>(`/tags`, payload);
  },
  update(id: string, payload: TagUpdateInput) {
    return http.post<{ tag: Tag }>(`/tags/${id}`, payload);
  },
};
