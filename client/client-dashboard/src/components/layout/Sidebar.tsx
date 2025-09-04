import { LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router";
import clsx from "clsx";

interface SidebarProps {
  isCollapsed?: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const location = useLocation();

  const menus = [{ label: "Dashboard", path: "/dashboard" }];

  return (
    <aside
      className={`${
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      } w-64 bg-[#293d5d] h-screen transition-transform duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-center my-6">
        <img
          src="/logo.png"
          alt="Logo Revitalisasi Dashboard"
          className="h-20 object-contain"
        />
      </div>

      <nav className="mt-4">
        <ul>
          {menus.map((menu) => (
            <li key={menu.path} className="px-3">
              <Link
                to={menu.path}
                className={clsx(
                  "block px-4 py-2 rounded-lg transition-colors duration-200",
                  location.pathname === menu.path
                    ? "bg-white font-medium"
                    : "hover:bg-zinc-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5" />
                  <span>{menu.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
