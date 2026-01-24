// product/parts/create/product-create.part.tsx

import { Button } from "@/common/component/ui";
import type { UserPageState } from "../type";
import { UserFormCreate } from "../../form";

interface Props {
  setState: React.Dispatch<React.SetStateAction<UserPageState>>;
  state: Extract<UserPageState, { view: "CREATE" }>;
}

export function UserPageCreate({ setState, state }: Props) {
  return (
    <>
      <h2 className="text-center text-3xl">Tạo Mới</h2>

      <Button
        onClick={() =>
          setState({
            view: "LIST",
            params: {
              page: 1,
              limit: 10,
              order: "desc",
              orderBy: "",
            },
          })
        }
      >
        Quay lại
      </Button>
      <UserFormCreate params={state.params} />
    </>
  );
}
