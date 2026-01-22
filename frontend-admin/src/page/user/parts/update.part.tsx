// product/parts/update/product-update.part.tsx

import type { UserPageState } from "../types/user-state.type";

interface Props {
  id: string;
  setState: React.Dispatch<React.SetStateAction<UserPageState>>;
}

export default function UserUpdatePart({ id, setState }: Props) {
  return (
    <>
      <h2>Update Product {id}</h2>

      <button
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
        Back
      </button>
    </>
  );
}
