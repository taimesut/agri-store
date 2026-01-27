import { Dialog, DialogHeader } from "@/common/component/ui";
import type { UserPageState } from "../../type";
import { UserFormUpdate } from "../../../form/update";

interface Props {
  id: string;
  pageState: Extract<UserPageState, { view: "DETAIL" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UserDialogUpdate({ id, openDialog, setOpenDialog }: Props) {
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogHeader
          title="Sửa thông tin"
          onClose={() => setOpenDialog(false)}
        />
        <UserFormUpdate id={id} />
      </Dialog>
    </>
  );
}
