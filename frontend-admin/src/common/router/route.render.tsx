import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { RouteGuest, RoutePrivate } from "./guard";
import type { AppRouteConfig } from "./type";
import { APP_ROUTES } from "./constant/app-routes.constant";

function renderRoute(route: AppRouteConfig) {
  const Element = route.element;
  const Layout = route.layout;

  const Page = Element && (
    <Suspense fallback={<div>Loading...</div>}>
      <Element />
    </Suspense>
  );

  if (route.isPrivate) {
    return (
      <Route key={route.name} element={<RoutePrivate />}>
        <Route path={route.path} element={Layout ? <Layout /> : undefined}>
          {Page && <Route index={!route.children} element={Page} />}
          {route.children?.map(renderRoute)}
        </Route>
      </Route>
    );
  }

  // có thể thêm register
  if (route.name === "LOGIN") {
    return (
      <Route key={route.name} element={<RouteGuest />}>
        <Route element={Layout ? <Layout /> : undefined}>
          <Route path={route.path} element={Page} />
        </Route>
      </Route>
    );
  }

  return (
    <Route
      key={route.name}
      path={route.path}
      element={Layout ? <Layout /> : undefined}
    >
      {Page && <Route index={!route.children} element={Page} />}
      {route.children?.map(renderRoute)}
    </Route>
  );
}

export function AppRouter() {
  return <Routes>{APP_ROUTES.map(renderRoute)}</Routes>;
}
