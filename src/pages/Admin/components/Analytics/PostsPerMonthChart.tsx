import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const mockMonthlyData = [
  { month: "Jan", posts: 4 },
  { month: "Feb", posts: 2 },
  { month: "Mar", posts: 6 },
  { month: "Apr", posts: 3 },
  { month: "May", posts: 5 },
  { month: "Jun", posts: 1 },
];

const PostsPerMonthChart = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Posts per Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockMonthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" className="text-sm" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="posts" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PostsPerMonthChart;