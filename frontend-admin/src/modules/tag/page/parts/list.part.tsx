import {
  Button,
  ComboBox,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/common/component/ui";
import type { TagPageState } from "../types";
import { useState } from "react";
import { TagQueryList } from "../../query";

interface Props {
  state: Extract<TagPageState, { view: "LIST" }>;
  setState: React.Dispatch<React.SetStateAction<TagPageState>>;
}

const sortableFields = [
  { label: "Name", value: "name" },
  { label: "Thời gian tạo", value: "createAt" },
];

export function TagPageList({ setState, state }: Props) {
  const { params } = state;
  const queryList = TagQueryList({ params });

  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<string>();
  const [order, setOrder] = useState<"desc" | "asc">();
  const [limit, setLimit] = useState<number>();

  if (!queryList.isSuccess) {
    return <>Không có dữ liệu</>;
  }

  return (
    <>
      <h2 className="text-center text-3xl">Danh sách</h2>

      <div className="flex gap-4 mb-4 justify-between">
        <div>
          <Button
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
              searchable={false}
              defaultValue={"createAt"}
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
              <TableCell header={true}>Name</TableCell>
              <TableCell header={true}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queryList.data?.tags.map((e) => (
              <TableRow key={e.id}>
                <TableCell> </TableCell>
                <TableCell>{e.name}</TableCell>
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
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setState({
                          view: "DELETE",
                          id: e.id,
                          params,
                        });
                      }}
                    >
                      Delete
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
          total={queryList.data.meta.total}
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
