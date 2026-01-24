export const USER_PAGE_VIEW = {
  LIST: "LIST",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
} as const;

export type UserPageView =
  (typeof USER_PAGE_VIEW)[keyof typeof USER_PAGE_VIEW];
