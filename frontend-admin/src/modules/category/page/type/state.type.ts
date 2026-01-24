import type { SearchParams } from "@/common/interface";
import type { Category_PAGE_VIEW } from "./view.type";

export type CategoryPageState =
  | {
      view: typeof Category_PAGE_VIEW.LIST;
      params: SearchParams;
    }
  | {
      view: typeof Category_PAGE_VIEW.CREATE;
      params: SearchParams;
    }
  | {
      view: typeof Category_PAGE_VIEW.DELETE;
      params: SearchParams;
      id: string;
    }
  | {
      view: typeof Category_PAGE_VIEW.UPDATE;
      params: SearchParams;
      id: string;
    };
