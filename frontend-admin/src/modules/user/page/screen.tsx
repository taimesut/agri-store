import { useState } from "react";
import type { UserPageState } from "./type";
import {
  UserPageCreate,
  UserPageDelete,
  UserPageList,
  UserPageUpdate,
} from "./parts";

export default function UserScreen() {
  const [pageState, setPageState] = useState<UserPageState>({
    view: "LIST",
    params: {
      limit: 10,
      order: "desc",
      orderBy: "createdAt",
      page: 1,
    },
  });
  switch (pageState.view) {
    case "CREATE":
      return (
        <UserPageCreate
          state={pageState}
          setState={setPageState}
        ></UserPageCreate>
      );
    case "UPDATE":
      return (
        <UserPageUpdate
          state={pageState}
          id={pageState.id}
          setState={setPageState}
        ></UserPageUpdate>
      );
    case "DELETE":
      return (
        <UserPageDelete
          setState={setPageState}
          state={pageState}
        ></UserPageDelete>
      );
    case "LIST":
    default:
      return (
        <UserPageList state={pageState} setState={setPageState}></UserPageList>
      );
  }
}
