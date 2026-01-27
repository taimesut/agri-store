import { Button, Card } from "@/common/component/ui";
import type { TagPageState } from "../type";
import { useState } from "react";
import { TagDialogDelete, TagDialogUpdate } from "./dialog";
import { TagQueryDetail } from "../../query";

interface Props {
  id: string;
  setPageState: React.Dispatch<React.SetStateAction<TagPageState>>;
  pageState: Extract<TagPageState, { view: "DETAIL" }>;
}
export function TagDetailPage({ setPageState, pageState, id }: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const queryDetail = TagQueryDetail({ id });

  if (queryDetail.isLoading) {
    return <div>Đang tải...</div>;
  }

  if (queryDetail.isError || !queryDetail.data?.tag) {
    return <div>Không tìm thấy thông tin</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center px-4">
        <Button
          onClick={() =>
            setPageState({
              view: "LIST",
              params: {
                ...pageState.params,
              },
            })
          }
        >
          Quay lại
        </Button>
        <Button variant="danger" onClick={() => setOpenDeleteDialog(true)}>
          Xóa
        </Button>
      </div>

      <div className="md:flex md:gap-x-8">
        <Card className="w-full mt-4">
          <Card.Header>
            <div className="flex justify-between items-center">
              <span>Thông tin</span>
              <Button onClick={() => setOpenUpdateDialog(true)}>Sửa</Button>
            </div>
          </Card.Header>
          <Card.Body className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Name</span>
              <p className="font-medium">{queryDetail.data.tag.name}</p>
            </div>
          </Card.Body>
        </Card>
        <TagDialogDelete
          openDialog={openDeleteDialog}
          setOpenDialog={setOpenDeleteDialog}
          pageState={pageState}
          id={id}
          setPageState={setPageState}
        />

        <TagDialogUpdate
          openDialog={openUpdateDialog}
          setOpenDialog={setOpenUpdateDialog}
          pageState={pageState}
          id={id}
        />
      </div>
    </>
  );
}
