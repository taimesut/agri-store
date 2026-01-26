import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@/common/component/ui";
import { UserMutationDelete } from "@/module/user/query";
import type { UserPageState } from "../../type";

interface Props {
  pageState: Extract<UserPageState, { view: "DETAIL" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setPageState: React.Dispatch<React.SetStateAction<UserPageState>>;
}

export function UserDialogDelete({
  pageState,
  openDialog,
  setOpenDialog,
  id,
  setPageState,
}: Props) {
  const { params } = pageState;
  const mutationUserDelete = UserMutationDelete();

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
