import { ROUTE_NAME } from "./route.type";
import type { AppRouteConfig } from "./route.interface";
import { AuthLayout } from "@/common/layout";
import { MainLayout } from "@/common/layout/main/main.layout";
import LoginScreen from "@/modules/login/page";
import UserScreen from "@/modules/user/page";

export const ROUTES: AppRouteConfig[] = [
  {
    name: ROUTE_NAME.LOGIN,
    path: "/login",
    element: LoginScreen,
    layout: AuthLayout,
  },
  {
    name: ROUTE_NAME.USER,
    path: "/users",
    element: UserScreen,
    layout: MainLayout,
    isPrivate: true,
  },
];
