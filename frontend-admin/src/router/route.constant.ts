import { AuthLayout, MainLayout } from "../layouts";
import LoginScreen from "../pages/auth/login";
import { ROUTE_NAME } from "./route.type";
import type { AppRouteConfig } from "./route.interface";
import DashboardScreen from "@/pages/dashboard";
import UserScreen from "@/pages/user";

export const ROUTES: AppRouteConfig[] = [
  {
    name: ROUTE_NAME.LOGIN,
    path: "/login",
    element: LoginScreen,
    layout: AuthLayout,
  },
  {
    name: ROUTE_NAME.DASHBOARD,
    path: "/dashboard",
    element: DashboardScreen,
    layout: MainLayout,
    isPrivate: true,
  },
    {
    name: ROUTE_NAME.USER,
    path: "/users",
    element: UserScreen,
    layout: MainLayout,
    isPrivate: true,
  },
];
