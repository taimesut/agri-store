import { useAuthStore } from "../../store";
import { Navigate, Outlet } from "react-router-dom";

export function RouteGuest() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
