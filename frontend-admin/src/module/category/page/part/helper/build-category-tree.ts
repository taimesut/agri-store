import type { Category } from "@/module/category/schema";

export type CategoryNode = Category & {
  children: CategoryNode[];
};

export function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const map = new Map<string, CategoryNode>();
  const roots: CategoryNode[] = [];

  for (const item of categories) {
    map.set(item.id, { ...item, children: [] });
  }

  for (const item of categories) {
    const node = map.get(item.id)!;

    if (item.parentId) {
      const parent = map.get(item.parentId);
      parent?.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
