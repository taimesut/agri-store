import type { SearchParams } from "@/common/type";
import type { USER_PAGE_VIEW } from "./page-view.type";

export type UserPageState =
  | {
      view: typeof USER_PAGE_VIEW.LIST;
      params: SearchParams;
    }
  | {
      view: typeof USER_PAGE_VIEW.DETAIL;
      params: SearchParams;
      id: string;
    };
