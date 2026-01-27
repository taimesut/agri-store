export const ROUTE_NAME = {
  LOGIN: "LOGIN",
  TAG: "TAG",
  USER: "USER",
  HOME: "HOME",
  CATEGORY: "CATEGORY",
} as const;

export type RouteName = keyof typeof ROUTE_NAME;