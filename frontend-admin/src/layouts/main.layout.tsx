import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
