import { useState } from "react";
import type { UserPageState } from "./type";
import { UserPageList } from "./part";
import { UserDetailPage } from "./part/detail.part";
import { DEFAULT_PARAMS } from "./constant";



export default function UserScreen() {
  const [pageState, setPageState] = useState<UserPageState>({
    view: "LIST",
    params: {
      ...DEFAULT_PARAMS,
    },
  });
  switch (pageState.view) {
    case "DETAIL":
      return (
        <UserDetailPage
          pageState={pageState}
          id={pageState.id}
          setPageState={setPageState}
        ></UserDetailPage>
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
