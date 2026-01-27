import type { SearchParams } from "@/common/type";
import type { TAG_PAGE_VIEW } from "./page-view.type";

export type TagPageState =
  | {
      view: typeof TAG_PAGE_VIEW.LIST;
      params: SearchParams;
    }
  | {
      view: typeof TAG_PAGE_VIEW.DETAIL;
      params: SearchParams;
      id: string;
    };
