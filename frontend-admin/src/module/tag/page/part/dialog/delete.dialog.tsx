import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@/common/component/ui";
import type { TagPageState } from "../../type";
import { TagMutationDelete } from "../../../query/mutations";

interface Props {
  pageState: Extract<TagPageState, { view: "DETAIL" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setPageState: React.Dispatch<React.SetStateAction<TagPageState>>;
}

export function TagDialogDelete({
  pageState,
  openDialog,
  setOpenDialog,
  id,
  setPageState,
}: Props) {
  const { params } = pageState;
  const mutationUserDelete = TagMutationDelete();

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
