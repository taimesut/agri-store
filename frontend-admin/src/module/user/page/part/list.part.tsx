import {
  Button,
  ComboBox,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/common/component/ui";
import { type UserPageState } from "../type";
import { useState } from "react";
import { UserQueryList } from "../../query";
import { UserDialogCreate } from "./dialog";

interface Props {
  pageState: Extract<UserPageState, { view: "LIST" }>;
  setPageState: React.Dispatch<React.SetStateAction<UserPageState>>;
}

const sortableFields = [
  { label: "Email", value: "email" },
  { label: "Full Name", value: "fullName" },
  { label: "Phone", value: "phone" },
  { label: "Thời gian tạo", value: "createAt" },
];

export function UserPageList({ setPageState, pageState }: Props) {
  const { params } = pageState;
  const queryList = UserQueryList({ params });

  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<string>();
  const [order, setOrder] = useState<"desc" | "asc">();
  const [limit, setLimit] = useState<number>();
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  if (!queryList.isSuccess) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex gap-4 mb-4 justify-between">
        <Button variant="secondary" onClick={() => setOpenCreateDialog(true)}>
          Tạo mới
        </Button>

        <UserDialogCreate
          setOpenDialog={setOpenCreateDialog}
          openDialog={openCreateDialog}
          pageState={pageState}
        />

        <div className="flex h-12 gap-4">
          <div>
            <ComboBox
              className="w-full"
              options={[
                {
                  label: "5",
                  value: 5,
                },
                {
                  label: "10",
                  value: 10,
                },
                {
                  label: "20",
                  value: 20,
                },
              ]}
              value={limit}
              onChange={setLimit}
              defaultValue={20}
              searchable={false}
            />
          </div>
          <div>
            <ComboBox
              className="w-full"
              options={[
                {
                  label: "Giảm dần",
                  value: "desc",
                },
                {
                  label: "Tăng dần",
                  value: "asc",
                },
              ]}
              value={order}
              onChange={setOrder}
              defaultValue={"desc"}
              searchable={false}
            />
          </div>
          <div>
            <ComboBox
              className="w-full"
              options={sortableFields}
              value={sortField}
              onChange={setSortField}
              defaultValue={"createAt"}
              searchable={false}
            />
          </div>
          <div>
            <Input
              type="text"
              className="w-full"
              placeholder="Nhập keyword ..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Button
              className="w-full"
              onClick={() => {
                setPageState({
                  view: "LIST",
                  params: {
                    ...params,
                    search,
                    orderBy: sortField || "createAt",
                    order: order || "desc",
                    limit: limit || 20,
                    page: 1,
                  },
                });
              }}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell header={true}>STT</TableCell>
              <TableCell header={true}>Email</TableCell>
              <TableCell header={true}>Full Name</TableCell>
              <TableCell header={true}>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queryList.data?.users.map((e, idx) => (
              <TableRow
                key={e.id}
                onClick={() => {
                  setPageState({
                    view: "DETAIL",
                    id: e.id,
                    params,
                  });
                }}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.fullName}</TableCell>
                <TableCell>{e.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          page={params.page}
          limit={params.limit}
          total={queryList.data.meta.total}
          onChange={(page) =>
            setPageState((prev) => ({
              ...prev,
              params: {
                ...prev.params,
                page,
              },
            }))
          }
        />
      </div>
    </>
  );
}
