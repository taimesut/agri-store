import { useMutationUserDelete } from "@/query/user/user.mutations";
import type { UserPageState } from "../types/user-state.type";
import { Button, Card } from "@/component/ui";

interface Props {
  setState: React.Dispatch<React.SetStateAction<UserPageState>>;
  state: Extract<UserPageState, { view: "DELETE" }>;
}

export default function UserDeletePart({ setState, state }: Props) {
  const { params, id } = state;
  const mutationUserDelete = useMutationUserDelete({ params });

  return (
    <Card>
      <Card.Header>Xóa Người dùng</Card.Header>
      <Card.Body>
        <p>Bạn có chắc chắn thực hiện thao tác này không?</p>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              mutationUserDelete.mutate({ id });
              setState({
                view: "LIST",
                params: {
                  page: 1,
                  limit: 10,
                  order: "desc",
                  orderBy: "",
                },
              });
            }}
          >
            Có
          </Button>
          <Button
            onClick={() => {
              setState({
                view: "LIST",
                params: {
                  page: 1,
                  limit: 10,
                  order: "desc",
                  orderBy: "",
                },
              });
            }}
          >
            Không
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
