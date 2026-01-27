import { useState } from "react";
import type { CategoryPageState } from "./type";
import { CategoryPageList } from "./part";
import { CategoryDetailPage } from "./part/detail.part";
import { DEFAULT_PARAMS } from "./constant";



export default function CategoryPageRender() {
  const [pageState, setPageState] = useState<CategoryPageState>({
    view: "LIST",
    params: {
      ...DEFAULT_PARAMS,
    },
  });
  switch (pageState.view) {
    case "DETAIL":
      return (
        <CategoryDetailPage
          pageState={pageState}
          id={pageState.id}
          setPageState={setPageState}
        ></CategoryDetailPage>
      );
    case "LIST":
    default:
      return (
        <CategoryPageList
          pageState={pageState}
          setPageState={setPageState}
        ></CategoryPageList>
      );
  }
}
