export const TAG_PAGE_VIEW = {
  LIST: "LIST",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
} as const;

export type TagPageView =
  (typeof TAG_PAGE_VIEW)[keyof typeof TAG_PAGE_VIEW];
