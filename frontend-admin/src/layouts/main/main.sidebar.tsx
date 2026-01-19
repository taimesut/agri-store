// layouts/dashboard/dashboard.sidebar.tsx
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const menu = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Users", to: "/users" },
  { label: "Products", to: "/products" },
  { label: "Orders", to: "/orders" },
];

export function MainSidebar () {
  return (
    <aside className="hidden w-64 border-r bg-background md:block">
      <div className="p-6 font-bold text-lg">Admin</div>

      <nav className="space-y-1 px-3">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "block rounded-md px-3 py-2 text-sm hover:bg-muted",
                isActive && "bg-muted font-medium"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
