import type { SearchParams } from "@/common/interface";
import type { USER_PAGE_VIEW } from "./view.type";

export type UserPageState =
  | {
      view: typeof USER_PAGE_VIEW.LIST;
      params: SearchParams;
    }
  | {
      view: typeof USER_PAGE_VIEW.CREATE;
      params: SearchParams;
    }
  | {
      view: typeof USER_PAGE_VIEW.DELETE;
      params: SearchParams;
      id: string;
    }
  | {
      view: typeof USER_PAGE_VIEW.UPDATE;
      params: SearchParams;
      id: string;
    };
