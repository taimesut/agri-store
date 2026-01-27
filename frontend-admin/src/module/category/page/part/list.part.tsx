import {
  Button,
  ComboBox,
  Input,
  Pagination,
  Spinner,
} from "@/common/component/ui";
import { type CategoryPageState } from "../type";
import { useState } from "react";
import { CategoryQueryList } from "../../query";
import { CategoryDialogCreate } from "./dialog";
import { RenderCategoryTree } from "./helper/render-category-tree";
import { buildCategoryTree } from "./helper/build-category-tree";

interface Props {
  pageState: Extract<CategoryPageState, { view: "LIST" }>;
  setPageState: React.Dispatch<React.SetStateAction<CategoryPageState>>;
}

const orderByOptions = [{ label: "Thời gian tạo", value: "createdAt" }];

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

export function CategoryPageList({ setPageState, pageState }: Props) {
  const { params } = pageState;
  const queryList = CategoryQueryList({ params });

  const [search, setSearch] = useState<string>(params.search || "");
  const [orderBy, setOrderBy] = useState<string>(params.orderBy);
  const [order, setOrder] = useState<"desc" | "asc">(params.order);
  const [limit, setLimit] = useState<number>(params.limit);

  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  if (!queryList.isSuccess) {
    return <Spinner />;
  }
  const categoriesRender = buildCategoryTree(queryList.data.categories);

  return (
    <>
      <div className="flex gap-4 mb-4 justify-between">
        <Button variant="secondary" onClick={() => setOpenCreateDialog(true)}>
          Tạo mới
        </Button>

        <CategoryDialogCreate
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
        {RenderCategoryTree({
          categories: categoriesRender,
          level: 0,
          pageState,
          setPageState,
        })}
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          page={params.page}
          limit={params.limit}
          total={categoriesRender.length}
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
