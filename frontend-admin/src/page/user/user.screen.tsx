import { useState } from "react";
import UserListPart from "./parts/list.part";
import UserCreatePart from "./parts/create.part";
import UserUpdatePart from "./parts/update.part";
import UserDeletePart from "./parts/delete.part";
import type { UserPageState } from "./types/user-state.type";

export default function UserScreen() {
  const [pageState, setPageState] = useState<UserPageState>({
    view: "LIST",
    params: {
      limit: 20,
      order: "desc",
      orderBy: "createdAt",
      page: 1,
    },
  });

  switch (pageState.view) {
    case "CREATE":
      return (
        <UserCreatePart
          state={pageState}
          setState={setPageState}
        ></UserCreatePart>
      );
    case "UPDATE":
      return (
        <UserUpdatePart
          id={pageState.id}
          setState={setPageState}
        ></UserUpdatePart>
      );
    case "DELETE":
      return (
        <UserDeletePart
          setState={setPageState}
          state={pageState}
        ></UserDeletePart>
      );
    case "LIST":
    default:
      return (
        <UserListPart state={pageState} setState={setPageState}></UserListPart>
      );
  }
}
