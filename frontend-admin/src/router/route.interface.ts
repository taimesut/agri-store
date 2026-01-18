import type { RouteName } from "./route.enum";

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
