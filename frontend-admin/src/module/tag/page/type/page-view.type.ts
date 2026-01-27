export const TAG_PAGE_VIEW = {
  LIST: "LIST",
  DETAIL: "DETAIL",
} as const;

export type TagPageView = (typeof TAG_PAGE_VIEW)[keyof typeof TAG_PAGE_VIEW];
