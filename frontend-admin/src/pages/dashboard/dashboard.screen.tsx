import type React from "react";
import { DASHBOARD_PAGE_TITLE } from "./dashboard.constant";

const DashboardScreen: React.FC = () => {
  return (
    <>
      <div className="login-screen border-2 p-8 rounded-2xl bg-amber-200 min-w-md">
        <h1 className="text-3xl text-center">{DASHBOARD_PAGE_TITLE}</h1>
      </div>
    </>
  );
};

export default DashboardScreen;
