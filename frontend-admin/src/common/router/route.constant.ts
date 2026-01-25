import { ROUTE_NAME } from "./route.type";
import type { AppRouteConfig } from "./route.type";
import { AuthLayout } from "@/common/layout";
import { MainLayout } from "@/common/layout/main/main.layout";
import LoginScreen from "@/module/login/page";
import UserScreen from "@/module/user/page";
import HomeScreen from "@/module/home";

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
  // {
  //   name: ROUTE_NAME.USER,
  //   path: "/tags",
  //   element: TagScreen,
  //   layout: MainLayout,
  //   isPrivate: true,
  // },
  // {
  //   name: ROUTE_NAME.CATEGORY,
  //   path: "/categories",
  //   element: CategoryScreen,
  //   layout: MainLayout,
  //   isPrivate: true,
  // },
  {
    name: ROUTE_NAME.USER,
    path: "/",
    element: HomeScreen,
    layout: MainLayout,
    isPrivate: true,
  },
];
