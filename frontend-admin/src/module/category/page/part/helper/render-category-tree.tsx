import { Collapsible } from "@/common/component/ui";
import type { CategoryNode } from "./build-category-tree";
import type { CategoryPageState } from "../../type";
import type { UserPageState } from "@/module/user/page/type";

interface Props {
  categories: CategoryNode[];
  level: number;
  setPageState: React.Dispatch<React.SetStateAction<CategoryPageState>>;
  pageState: Extract<UserPageState, { view: "LIST" }>;
}

export function RenderCategoryTree({
  categories,
  level,
  setPageState,
  pageState,
}: Props) {
  const { params } = pageState;
  return (
    <>
      {categories.map((e) => {
        const hasChildren = e.children && e.children.length > 0;

        const Row = (
          <div
            className="flex items-center justify-between  px-3 py-2 hover:bg-gray-50"
            style={{ paddingLeft: level * 16 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-400">{hasChildren ? "▸" : "•"}</span>
              <span
                className="font-medium"
                onClick={() => {
                  setPageState({
                    view: "DETAIL",
                    id: e.id,
                    params,
                  });
                }}
              >
                {e.name}
              </span>
            </div>
          </div>
        );
        if (!hasChildren) {
          return <div key={e.id}>{Row}</div>;
        }

        return (
          <Collapsible key={e.id}>
            <Collapsible.Trigger>{Row}</Collapsible.Trigger>

            <Collapsible.Content>
              {RenderCategoryTree({
                categories: e.children,
                level: level + 1,
                pageState,
                setPageState,
              })}
            </Collapsible.Content>
          </Collapsible>
        );
      })}
    </>
  );
}
