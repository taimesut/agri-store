import { ROUTE_NAME } from "./route.type";
import type { AppRouteConfig } from "./route.interface";
import { AuthLayout } from "@/common/layout";
import { MainLayout } from "@/common/layout/main/main.layout";
import LoginScreen from "@/modules/auth/page/login";
import UserScreen from "@/modules/user/page";
import TagScreen from "@/modules/tag/page";

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
  {
    name: ROUTE_NAME.TAG,
    path: "/tags",
    element: TagScreen,
    layout: MainLayout,
    isPrivate: true,
  },
];
