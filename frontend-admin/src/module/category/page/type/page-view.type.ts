export const Category_PAGE_VIEW = {
  LIST: "LIST",
  DETAIL: "DETAIL",
} as const;

export type CategoryPageView = (typeof Category_PAGE_VIEW)[keyof typeof Category_PAGE_VIEW];
