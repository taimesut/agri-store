
import { http } from "../../common/configs/http";
import type { CreateWorkspaceDTO, WorkSpace } from "./workspace.interfaces";

export const workspaceApi = {
  getList() {
    return http.get<WorkSpace[]>("/workspaces");
  },

  getById(id: string) {
    return http.get<WorkSpace>(`/workspaces/${id}`);
  },

  create(payload: CreateWorkspaceDTO) {
    return http.post<WorkSpace, CreateWorkspaceDTO>("/workspaces", payload);
  },
};
