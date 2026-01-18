import { AuthLayout } from "../layouts";
import LoginScreen from "../pages/auth/login";
import { ROUTE_NAME } from "./route.enum";
import type { AppRouteConfig } from "./route.interface";


export const ROUTES: AppRouteConfig[] = [
  {
    name: ROUTE_NAME.LOGIN,
    path:'/login',
    element: LoginScreen,
    layout: AuthLayout
  }
];
