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
import { type TagPageState } from "../type";
import { useState } from "react";
import { TagQueryList } from "../../query";
import { TagDialogCreate } from "./dialog";

interface Props {
  pageState: Extract<TagPageState, { view: "LIST" }>;
  setPageState: React.Dispatch<React.SetStateAction<TagPageState>>;
}

const orderByOptions = [
  { label: "Email", value: "email" },
  { label: "Full Name", value: "fullName" },
  { label: "Phone", value: "phone" },
  { label: "Thời gian tạo", value: "createdAt" },
];

const limitOptions = [
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
];

const orderOptions = [
  {
    label: "Giảm dần",
    value: "desc",
  },
  {
    label: "Tăng dần",
    value: "asc",
  },
];

export function UserPageList({ setPageState, pageState }: Props) {
  const { params } = pageState;
  const queryList = TagQueryList({ params });

  const [search, setSearch] = useState<string>(params.search || "");
  const [orderBy, setOrderBy] = useState<string>(params.orderBy);
  const [order, setOrder] = useState<"desc" | "asc">(params.order);
  const [limit, setLimit] = useState<number>(params.limit);

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

        <TagDialogCreate
          setOpenDialog={setOpenCreateDialog}
          openDialog={openCreateDialog}
          pageState={pageState}
        />

        <div className="flex h-12 gap-4">
          <div>
            <ComboBox
              className="w-full"
              options={limitOptions}
              value={limit}
              onChange={(v) => setLimit(v ?? 20)}
              searchable={false}
            />
          </div>
          <div>
            <ComboBox
              className="w-full"
              options={orderOptions}
              value={order}
              onChange={(v) => setOrder((v ?? "desc") as "asc" | "desc")}
              searchable={false}
            />
          </div>
          <div>
            <ComboBox
              className="w-full"
              options={orderByOptions}
              onChange={(v) => setOrderBy(v ?? "createdAt")}
              searchable={false}
              value={orderBy}
            />
          </div>
          <div>
            <Input
              type="text"
              className="w-full"
              placeholder="Nhập keyword ..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
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
                    orderBy,
                    order,
                    limit,
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
              <TableCell header={true}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queryList.data?.tags.map((e, idx) => (
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
                <TableCell>{e.name}</TableCell>
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
