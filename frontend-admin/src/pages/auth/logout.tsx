import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../../stores/useCurrentUserStore";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useCurrentUserStore();

  useEffect(() => {
    (async () => {
      try {
        await logout();
      } catch (err) {
        console.error(err);
      } finally {
        navigate("/login", { replace: true });
      }
    })();
  }, [logout, navigate]);

  return null;
}
