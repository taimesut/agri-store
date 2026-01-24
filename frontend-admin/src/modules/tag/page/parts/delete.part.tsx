import { TagMutationDelete } from "../../query";
import type { TagPageState } from "../type";
import { Button, Card } from "@/common/component/ui";

interface Props {
  setState: React.Dispatch<React.SetStateAction<TagPageState>>;
  state: Extract<TagPageState, { view: "DELETE" }>;
}

export function TagPageDelete({ setState, state }: Props) {
  const { params, id } = state;
  const mutationUserDelete = TagMutationDelete({ params });

  return (
    <Card>
      <Card.Header>Xóa Dữ liệu</Card.Header>
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
