import { Mail, Search, SunMoon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full mb-18 flex justify-between items-center px-6 py-4 fixed top-0 z-50 backdrop-blur-sm bg-transparent  text-black dark:text-white">
      {/* Left: Site name */}
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/">StackLog</Link>
      </div>

      {/* Center: Navigation links */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <Link className="text-white-500" to="/">Blogs</Link>
        <Link to="/create-post">Create Post</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Right: Icons & Subscribe */}
      <div className="flex items-center gap-4">
        <button className="hover:text-blue-500">
          <Search size={20} />
        </button>
        <button className="hover:text-blue-500">
          <SunMoon size={20} />
        </button>
        <Link
          to="/subscribe"
          className="flex items-center gap-1 border border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-all text-sm"
        >
          <Mail size={16} />
          Subscribe
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
