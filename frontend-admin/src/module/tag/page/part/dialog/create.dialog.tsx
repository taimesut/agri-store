import { Dialog, DialogHeader } from "@/common/component/ui";
import { TagFormCreate } from "../../../form";
import type { TagPageState } from "../../type";

interface Props {
  pageState: Extract<TagPageState, { view: "LIST" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export function TagDialogCreate({ openDialog, setOpenDialog }: Props) {
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogHeader title="Tạo Mới" onClose={() => setOpenDialog(false)} />
        <TagFormCreate />
      </Dialog>
    </>
  );
}
