// product/parts/update/product-update.part.tsx

import { Button } from "@/common/component/ui";
import type { CategoryPageState } from "../type";
import { UserFormUpdate } from "../../form";

interface Props {
  id: string;
  setState: React.Dispatch<React.SetStateAction<CategoryPageState>>;
  state: Extract<CategoryPageState, { view: "UPDATE" }>;
}

export function UserPageUpdate({ id, setState, state }: Props) {
  return (
    <>
      <h2 className="text-center text-3xl">Cập nhật</h2>

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
      <UserFormUpdate id={id} params={state.params} />
    </>
  );
}
