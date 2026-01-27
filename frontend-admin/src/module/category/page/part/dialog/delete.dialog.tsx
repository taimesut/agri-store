import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@/common/component/ui";
import { CategoryMutationDelete } from "../../../query/mutations";
import type { CategoryPageState } from "../../type";

interface Props {
  pageState: Extract<CategoryPageState, { view: "DETAIL" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setPageState: React.Dispatch<React.SetStateAction<CategoryPageState>>;
}

export function CategoryDialogDelete({
  pageState,
  openDialog,
  setOpenDialog,
  id,
  setPageState,
}: Props) {
  const { params } = pageState;
  const mutationUserDelete = CategoryMutationDelete();

  function closeDialog() {
    setOpenDialog(false);
  }
  return (
    <Dialog open={openDialog} onClose={closeDialog}>
      <DialogHeader title="Xóa dữ liệu" onClose={closeDialog} />
      <DialogBody>
        <p>Bạn có chắc chắn thực hiện thao tác này không?</p>
        <Button
          className="mt-4"
          onClick={() => {
            mutationUserDelete.mutate({ id });
            setPageState({
              view: "LIST",
              params: params,
            });
          }}
        >
          Có
        </Button>
      </DialogBody>
    </Dialog>
  );
}
