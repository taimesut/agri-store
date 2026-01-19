export const ROUTE_NAME = {
  HOME: "HOME",
  LOGIN: "LOGIN",
  DASHBOARD: "DASHBOARD",
  USER: "USER",
  NOT_FOUND: "NOT_FOUND",
} as const;

export type RouteName = keyof typeof ROUTE_NAME;
