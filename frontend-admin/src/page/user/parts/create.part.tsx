// product/parts/create/product-create.part.tsx

import { Button } from "@/component/ui";
import type { UserPageState } from "../types/user-state.type";
import { CreateUserForm } from "@/form/user/create-user.form";

interface Props {
  setState: React.Dispatch<React.SetStateAction<UserPageState>>;
  state: Extract<UserPageState, { view: "CREATE" }>;
}

export default function UserCreatePart({ setState, state }: Props) {
  return (
    <>
      <h2 className="text-center text-3xl">Tạo User</h2>

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
      <CreateUserForm params={state.params} />
    </>
  );
}
