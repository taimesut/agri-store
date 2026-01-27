import { useState } from "react";
import type { TagPageState } from "./type";
import { UserPageList } from "./part";
import { TagDetailPage } from "./part/detail.part";
import { DEFAULT_PARAMS } from "./constant";



export default function TagPageRender() {
  const [pageState, setPageState] = useState<TagPageState>({
    view: "LIST",
    params: {
      ...DEFAULT_PARAMS,
    },
  });
  switch (pageState.view) {
    case "DETAIL":
      return (
        <TagDetailPage
          pageState={pageState}
          id={pageState.id}
          setPageState={setPageState}
        ></TagDetailPage>
      );
    case "LIST":
    default:
      return (
        <UserPageList
          pageState={pageState}
          setPageState={setPageState}
        ></UserPageList>
      );
  }
}
