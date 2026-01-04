import { useCurrentUserStore } from "../stores/useCurrentUserStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useCurrentUserStore();

  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
