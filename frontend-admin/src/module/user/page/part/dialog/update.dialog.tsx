// product/parts/update/product-update.part.tsx

import { Dialog, DialogHeader } from "@/common/component/ui";
import type { UserPageState } from "../../type";
import { UserFormUpdate } from "@/module/user/form";

interface Props {
  id: string;
  pageState: Extract<UserPageState, { view: "DETAIL" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UserDialogUpdate({
  id,
  pageState,
  openDialog,
  setOpenDialog,
}: Props) {
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
        <UserFormUpdate id={id} params={pageState.params}/>
      </Dialog>
    </>
  );
}
