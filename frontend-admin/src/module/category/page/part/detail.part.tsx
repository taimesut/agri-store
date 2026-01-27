import { Button, Card } from "@/common/component/ui";
import type { CategoryPageState } from "../type";
import { useState } from "react";
import { CategoryDialogDelete, CategoryDialogUpdate } from "./dialog";
import { CategoryQueryDetail } from "../../query";

interface Props {
  id: string;
  setPageState: React.Dispatch<React.SetStateAction<CategoryPageState>>;
  pageState: Extract<CategoryPageState, { view: "DETAIL" }>;
}
export function CategoryDetailPage({ setPageState, pageState, id }: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const queryDetail = CategoryQueryDetail({ id });

  if (queryDetail.isLoading) {
    return <div>Đang tải...</div>;
  }

  if (queryDetail.isError || !queryDetail.data?.category) {
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
              <p className="font-medium">{queryDetail.data.category.name}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Handle</span>
              <p className="font-medium">{queryDetail.data.category.handle}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">ParentId</span>
              <p className="font-medium">
                {queryDetail.data.category.parentId}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Ngày tạo</span>
              <p className="font-medium">
                {new Date(
                  queryDetail.data.category?.createdAt,
                ).toLocaleString()}
              </p>
            </div>
          </Card.Body>
        </Card>
        <CategoryDialogDelete
          openDialog={openDeleteDialog}
          setOpenDialog={setOpenDeleteDialog}
          pageState={pageState}
          id={id}
          setPageState={setPageState}
        />

        <CategoryDialogUpdate
          openDialog={openUpdateDialog}
          setOpenDialog={setOpenUpdateDialog}
          pageState={pageState}
          id={id}
        />
      </div>
    </>
  );
}
