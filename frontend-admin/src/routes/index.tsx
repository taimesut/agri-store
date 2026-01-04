import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import PrivateRoute from "./private";
import MainLayout from "../layouts/main/main";
import DashboardPage from "../pages/dashboard";
import NotfoundPage from "../pages/notfound";
import UserPage from "../pages/users";
import ProductPage from "../pages/products";
import CategoryPage from "../pages/categories";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/categories" element={<CategoryPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}
