// src/layouts/auth.layout.tsx

import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <main className="h-screen w-screen flex justify-center items-center bg-amber-50">
        <Outlet />
      </main>
    </div>
  );
};
