import type { SearchParams } from "@/common/interface";
import type { USER_VIEW } from "./user-view.type";

export type UserPageState =
  | {
      view: typeof USER_VIEW.LIST;
      params: SearchParams;
    }
  | {
      view: typeof USER_VIEW.CREATE;
      params: SearchParams;
    }
  | {
      view: typeof USER_VIEW.DELETE;
      params: SearchParams;
      id: string;
    }
  | {
      view: typeof USER_VIEW.UPDATE;
      params: SearchParams;
      id: string;
    };
