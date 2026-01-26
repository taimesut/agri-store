import { Button, Card } from "@/common/component/ui";
import type { UserPageState } from "../type";
import { useState } from "react";
import { UserDialogDelete, UserDialogUpdate } from "./dialog";
import { UserQueryDetail } from "../../query";

interface Props {
  id: string;
  setPageState: React.Dispatch<React.SetStateAction<UserPageState>>;
  pageState: Extract<UserPageState, { view: "DETAIL" }>;
}
export function UserDetailPage({ setPageState, pageState, id }: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const queryDetail = UserQueryDetail({ id });

  if (queryDetail.isLoading) {
    return <div>Đang tải...</div>;
  }

  if (queryDetail.isError || !queryDetail.data?.user) {
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
              <span className="text-sm text-gray-500">Email</span>
              <p className="font-medium">{queryDetail.data.user.email}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Họ tên</span>
              <p className="font-medium">{queryDetail.data.user.fullName}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Số điện thoại</span>
              <p className="font-medium">{queryDetail.data.user.phone}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Ngày tạo</span>
              <p className="font-medium">
                {new Date(queryDetail.data.user?.createdAt).toLocaleString()}
              </p>
            </div>
          </Card.Body>
        </Card>
        <UserDialogDelete
          openDialog={openDeleteDialog}
          setOpenDialog={setOpenDeleteDialog}
          pageState={pageState}
          id={id}
          setPageState={setPageState}
        />

        <UserDialogUpdate
          openDialog={openUpdateDialog}
          setOpenDialog={setOpenUpdateDialog}
          pageState={pageState}
          id={id}
        />
      </div>
    </>
  );
}
