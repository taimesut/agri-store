import { Dialog, DialogHeader } from "@/common/component/ui";
import type { CategoryPageState } from "../../type";
import { CategoryFormUpdate } from "../../../form/update";

interface Props {
  id: string;
  pageState: Extract<CategoryPageState, { view: "DETAIL" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CategoryDialogUpdate({ id, openDialog, setOpenDialog }: Props) {
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
        <CategoryFormUpdate id={id} />
      </Dialog>
    </>
  );
}
