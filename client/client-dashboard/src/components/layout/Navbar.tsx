import { PanelLeft } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="bg-white border-b border-zinc-200 px-4 py-4 flex items-center justify-between">
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="hover:bg-zinc-200/80 rounded-lg p-2 transition-colors duration-200"
      >
        <PanelLeft className="w-4 h-4 text-zinc-800" />
      </button>
    </header>
  );
}
