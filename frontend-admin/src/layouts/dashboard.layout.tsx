import { Outlet } from "react-router-dom";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
