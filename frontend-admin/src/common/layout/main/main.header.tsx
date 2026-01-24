import { useNavigate } from "react-router-dom";
import { Button } from "@/common/component/ui";
import { useAuthStore } from "@/common/store";

export function MainHeader() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {user?.fullName}
        </span>

        <Button variant="danger" size="md" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
