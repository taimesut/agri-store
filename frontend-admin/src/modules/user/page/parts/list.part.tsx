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
import type { UserPageState } from "../types";
import { useState } from "react";
import { UserQueryList } from "../../query";

interface Props {
  state: Extract<UserPageState, { view: "LIST" }>;
  setState: React.Dispatch<React.SetStateAction<UserPageState>>;
}

const sortableFields = [
  { label: "Email", value: "email" },
  { label: "Full Name", value: "fullName" },
  { label: "Phone", value: "phone" },
  { label: "Thời gian tạo", value: "createAt" },
];

export function UserPageList({ setState, state }: Props) {
  const { params } = state;
  const queryUser = UserQueryList({ params });

  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<string>();
  const [order, setOrder] = useState<"desc" | "asc">();
  const [limit, setLimit] = useState<number>();

  if (!queryUser.isSuccess) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="text-center text-3xl">Danh sách</h2>

      <div className="flex gap-4 mb-4 justify-between">
        <div>
          <Button
          variant={"secondary"}
            onClick={() => {
              setState({
                view: "CREATE",
                params,
              });
            }}
          >
            Tạo mới
          </Button>
        </div>

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
              defaultValue={10}
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
                setState({
                  view: "LIST",
                  params: {
                    ...params,
                    search,
                    orderBy: sortField || "createAt",
                    order: order || "asc",
                    limit: limit || 10,
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
              <TableCell header={true}> </TableCell>
              <TableCell header={true}>Email</TableCell>
              <TableCell header={true}>Full Name</TableCell>
              <TableCell header={true}>Phone</TableCell>
              <TableCell header={true}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queryUser.data?.users.map((e) => (
              <TableRow key={e.id}>
                <TableCell> </TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.fullName}</TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        setState({
                          view: "UPDATE",
                          id: e.id,
                          params,
                        });
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant={"danger"}
                      onClick={() => {
                        setState({
                          view: "DELETE",
                          id: e.id,
                          params,
                        });
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          page={params.page}
          limit={params.limit}
          total={queryUser.data.meta.total}
          onChange={(page) =>
            setState((prev) => ({
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
