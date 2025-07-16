import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

const mockAuthorData = [
  { name: "Alice", value: 10 },
  { name: "Bob", value: 5 },
  { name: "Charlie", value: 3 },
  { name: "Diana", value: 2 },
];

const AuthorContributionChart = () => {
  return (
    <div className="bg-white h-[] dark:bg-gray-900 p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Author Contributions</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={mockAuthorData}
            dataKey="value"
            nameKey="name"
            outerRadius={70}
            fill="#8884d8"
            label
          >
            {mockAuthorData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AuthorContributionChart;