import { ROUTE_NAME, type AppRouteConfig } from "../type";
import { AuthLayout, MainLayout } from "@/common/layout";
import UserPageRender from "@/module/user/page";
import AuthLoginPageRender from "@/module/login/page";
import HomePageRender from "@/module/home";
import TagPageRender from "@/module/tag/page";
import CategoryPageRender from "@/module/category/page";

export const APP_ROUTES: AppRouteConfig[] = [
  {
    name: ROUTE_NAME.LOGIN,
    path: "/login",
    element: AuthLoginPageRender,
    layout: AuthLayout,
  },
  {
    name: ROUTE_NAME.USER,
    path: "/users",
    element: UserPageRender,
    layout: MainLayout,
    isPrivate: true,
  },
  {
    name: ROUTE_NAME.USER,
    path: "/tags",
    element: TagPageRender,
    layout: MainLayout,
    isPrivate: true,
  },
  {
    name: ROUTE_NAME.CATEGORY,
    path: "/categories",
    element: CategoryPageRender,
    layout: MainLayout,
    isPrivate: true,
  },
  {
    name: ROUTE_NAME.USER,
    path: "/",
    element: HomePageRender,
    layout: MainLayout,
    isPrivate: true,
  },
];
