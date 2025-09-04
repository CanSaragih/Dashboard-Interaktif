import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-500 ease-in-out ${
          isSidebarCollapsed ? "-ml-64" : "ml-0"
        }`}
      >
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
