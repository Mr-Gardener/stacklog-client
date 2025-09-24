import React, { ReactElement } from "react";
import { LucideProps } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactElement<LucideProps>;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  const sizedIcon = React.cloneElement(icon, {
    className: "w-5 h-5 text-blue-600 dark:text-blue-400",
  });

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-3 flex items-center gap-3 w-full">
      <div>{sizedIcon}</div>
      <div>
        <p className="text-xs text-gray-800 dark:text-gray-400">{title}</p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;

