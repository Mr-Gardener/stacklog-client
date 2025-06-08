import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Create New Post" to="/admin/create-post" />
          <DashboardCard title="Post Submissions" to="/admin/submissions" />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, to }: { title: string; to: string }) => (
  <Link
    to={to}
    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
  >
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-sm text-gray-500 mt-2">Go to {title}</p>
  </Link>
);

export default AdminDashboard;