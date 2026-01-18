// src/layouts/auth.layout.tsx

import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <main className="h-screen w-screen bg-amber-500">
        <Outlet />
      </main>
    </div>
  );
};
