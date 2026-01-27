import { Dialog, DialogHeader } from "@/common/component/ui";
import type { TagPageState } from "../../type";
import { TagFormUpdate } from "../../../form/update";

interface Props {
  id: string;
  pageState: Extract<TagPageState, { view: "DETAIL" }>;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TagDialogUpdate({ id, openDialog, setOpenDialog }: Props) {
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
        <TagFormUpdate id={id} />
      </Dialog>
    </>
  );
}
