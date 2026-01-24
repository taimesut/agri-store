import type { SearchParams } from "@/common/interface";
import type { TAG_PAGE_VIEW } from "./view.type";

export type TagPageState =
  | {
      view: typeof TAG_PAGE_VIEW.LIST;
      params: SearchParams;
    }
  | {
      view: typeof TAG_PAGE_VIEW.CREATE;
      params: SearchParams;
    }
  | {
      view: typeof TAG_PAGE_VIEW.DELETE;
      params: SearchParams;
      id: string;
    }
  | {
      view: typeof TAG_PAGE_VIEW.UPDATE;
      params: SearchParams;
      id: string;
    };
