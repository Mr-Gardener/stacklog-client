import StatsCard from "./StatsCard";
import { BarChart2, Users, MessageCircle, FileText } from "lucide-react";
import PostsPerMonthChart from "../components/Analytics/PostsPerMonthChart";
import AuthorContributionChart from "../components/Analytics/AuthorContributionChart";

const DashBoard = () => {
  return (
    <div>
      <p className="mt-4 pl-2 text-lg font-semibold">Overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-4">
        <StatsCard title="Total Posts" value={120} icon={<FileText size={28} />} />
        <StatsCard title="Total Authors" value={6} icon={<Users size={28} />} />
        <StatsCard title="Pending Comments" value={18} icon={<MessageCircle size={28} />} />
        <StatsCard title="Total Views" value={"2.4k"} icon={<BarChart2 size={28} />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PostsPerMonthChart />
        <AuthorContributionChart />
      </div>
    </div>
  );
};

export default DashBoard;