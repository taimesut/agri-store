export const USER_PAGE_VIEW = {
  LIST: "LIST",
  DETAIL: "DETAIL",
} as const;

export type UserPageView = (typeof USER_PAGE_VIEW)[keyof typeof USER_PAGE_VIEW];
