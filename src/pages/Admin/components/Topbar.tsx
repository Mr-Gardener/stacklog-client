import { Menu } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
    return (
    <div className="flex items-center justify-between px-4 py-3 border-gray-200 border-b">
      <button onClick={onMenuClick} className="md:hidden p-2 text-gray-700">
        <Menu className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold">Dashboard</h1>
    </div>
  );
};

export default TopBar;
