import { Dialog, DialogHeader } from "@/common/component/ui";
import { CategoryFormCreate } from "../../../form";
import type { CategoryPageState } from "../../type";

interface Props {
  pageState: Extract<CategoryPageState, { view: "LIST" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export function CategoryDialogCreate({ openDialog, setOpenDialog }: Props) {
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogHeader title="Tạo Mới" onClose={() => setOpenDialog(false)} />
        <CategoryFormCreate />
      </Dialog>
    </>
  );
}
