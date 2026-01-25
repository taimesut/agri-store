import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./route.constant";
import type { AppRouteConfig } from "./route.type";
import { RouteGuest, RoutePrivate } from "./guard";

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
  return <Routes>{ROUTES.map(renderRoute)}</Routes>;
}
