// product/parts/update/product-update.part.tsx

import { Button } from "@/common/component/ui";
import type { TagPageState } from "../type";
import { UserFormUpdate } from "../../form";

interface Props {
  id: string;
  setState: React.Dispatch<React.SetStateAction<TagPageState>>;
  state: Extract<TagPageState, { view: "UPDATE" }>;
}

export function TagPageUpdate({ id, setState, state }: Props) {
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
