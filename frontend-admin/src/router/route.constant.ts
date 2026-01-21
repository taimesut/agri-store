import LoginScreen from "../page/auth/login";
import { ROUTE_NAME } from "./route.type";
import type { AppRouteConfig } from "./route.interface";
import { AuthLayout } from "@/layout";
import DashboardScreen from "@/page/dashboard";
import { MainLayout } from "@/layout/main/main.layout";
import UserScreen from "@/page/user";

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
