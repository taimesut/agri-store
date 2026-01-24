// layouts/dashboard/dashboard.sidebar.tsx
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const menu = [
  { label: "Users", to: "/users" },
  { label: "Tags", to: "/tags" },
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
              clsx(
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
