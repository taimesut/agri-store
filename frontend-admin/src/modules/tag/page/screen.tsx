import { useState } from "react";
import type { TagPageState } from "./types";
import {
  TagPageCreate,
  TagPageDelete,
  TagPageList,
  TagPageUpdate,
} from "./parts";

export default function TagScreen() {
  const [pageState, setPageState] = useState<TagPageState>({
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
        <TagPageCreate
          state={pageState}
          setState={setPageState}
        ></TagPageCreate>
      );
    case "UPDATE":
      return (
        <TagPageUpdate
          state={pageState}
          id={pageState.id}
          setState={setPageState}
        ></TagPageUpdate>
      );
    case "DELETE":
      return (
        <TagPageDelete
          setState={setPageState}
          state={pageState}
        ></TagPageDelete>
      );
    case "LIST":
    default:
      return (
        <TagPageList state={pageState} setState={setPageState}></TagPageList>
      );
  }
}
