import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { pathname } = useLocation();

  const pageTitle = (() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "Dashboard";
    return parts[parts.length - 1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  })();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-gray-200 border-b bg-white shadow-sm">
      <button onClick={onMenuClick} className="md:hidden p-2 text-gray-700">
        <Menu className="w-6 h-6" />
      </button>
      <h1 className="text-lg md:text-xl font-semibold text-gray-800">{pageTitle}</h1>
    </div>
  );
};

export default TopBar;
