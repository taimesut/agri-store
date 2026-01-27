import type { SearchParams } from "@/common/type";
import type { Category_PAGE_VIEW } from "./page-view.type";

export type CategoryPageState =
  | {
      view: typeof Category_PAGE_VIEW.LIST;
      params: SearchParams;
    }
  | {
      view: typeof Category_PAGE_VIEW.DETAIL;
      params: SearchParams;
      id: string;
    };
