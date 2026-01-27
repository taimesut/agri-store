import { Outlet } from "react-router-dom";
import { MainSidebar } from "./sidebar";
import { MainHeader } from "./header";

export const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <MainSidebar />

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <MainHeader />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
