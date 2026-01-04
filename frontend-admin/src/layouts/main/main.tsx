import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

interface NavItem {
  link: string;
  title: string;
}

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `
    block px-4 py-2 rounded transition
    ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}
  `;

const navItem: NavItem[] = [
  {
    link: "/users",
    title: "Users",
  },
  {
    link: "/categories",
    title: "Categories",
  },
  {
    link: "/products",
    title: "Products",
  },
];

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 h-full w-64 bg-gray-800 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        {/* Menu */}
        <ul className="p-4 space-y-2">
          {navItem.map((item) => (
            <li key={item.link}>
              <NavLink
                to={item.link}
                className={navItemClass}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <NavLink
          to="/logout"
          className="absolute bottom-0 w-full p-4 bg-red-600 text-center hover:bg-red-700"
          onClick={() => setOpen(false)}
        >
          Đăng xuất
        </NavLink>
      </aside>

      {/* Content */}
      <main className="flex-1 flex flex-col">
        {/* Header mobile */}
        <header className="h-14 flex items-center px-4 border-b md:hidden">
          <button onClick={() => setOpen(true)} className="text-xl font-bold">
            ☰
          </button>
        </header>

        {/* Main content */}
        <section className="flex-1 p-4 overflow-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
