import { Dialog, DialogHeader } from "@/common/component/ui";
import { UserFormCreate } from "../../../form";
import type { UserPageState } from "../../type";

interface Props {
  pageState: Extract<UserPageState, { view: "LIST" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export function UserDialogCreate({ openDialog, setOpenDialog }: Props) {
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogHeader title="Tạo Mới" onClose={() => setOpenDialog(false)} />
        <UserFormCreate />
      </Dialog>
    </>
  );
}
