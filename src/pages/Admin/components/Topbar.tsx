const TopBar = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">Super Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, SuperAdmin</span>
        <img
          src="/default-avatar.png"
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default TopBar;
