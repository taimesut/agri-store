import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./route.constant";
import type { AppRouteConfig } from "./route.interface";

function renderRoute(route: AppRouteConfig) {
  const Element = route.element;

  const Layout = route.layout;

  if (Layout) {
    return (
      <Route key={route.name} path={route.path} element={<Layout />}>
        {Element && (
          <Route
            index={!route.children}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Element />
              </Suspense>
            }
          />
        )}

        {route.children?.map(renderRoute)}
      </Route>
    );
  } else {
    return (
      <Route key={route.name} path={route.path}>
        {Element && (
          <Route
            index={!route.children}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Element />
              </Suspense>
            }
          />
        )}

        {route.children?.map(renderRoute)}
      </Route>
    );
  }
}

export function AppRouter() {
  return <Routes>{ROUTES.map(renderRoute)}</Routes>;
}
