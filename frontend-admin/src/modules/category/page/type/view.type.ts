export const Category_PAGE_VIEW = {
  LIST: "LIST",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
} as const;

export type CategoryPageView =
  (typeof Category_PAGE_VIEW)[keyof typeof Category_PAGE_VIEW];
