export const ROUTE_NAME = {
  LOGIN: "LOGIN",
  TAG: "TAG",
  USER: "USER",
  HOME: "HOME",
  CATEGORY: "CATEGORY",
} as const;

export type RouteName = keyof typeof ROUTE_NAME;

export interface AppRouteConfig {
  /** Logical name (analytics, breadcrumb, permission) */
  name: RouteName;

  /** URL path */
  path: string;

  /** Page component */
  element: React.FC;

  /** Optional layout wrapper */
  layout?: React.FC;

  /** Auth required */
  isPrivate?: boolean;

  /** Role-based access */
  roles?: string[];

  /** Nested routes */
  children?: AppRouteConfig[];
}
