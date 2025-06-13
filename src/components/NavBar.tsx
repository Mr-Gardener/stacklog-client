import { Mail, Search} from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full mb-18 flex justify-between items-center px-6 py-6 fixed top-0 z-50 backdrop-blur-sm bg-transparent text-black ">
      {/* Left: Site name */}
      <div className="text-2xl font-bold tracking-wide dark:text-white">
        <Link to="/">StackLog</Link>
      </div>

      {/* Center: Navigation links */}
      <div className="hidden  md:flex gap-8 text-sm font-medium">
        <Link className="dark:text-white" to="/">Blogs</Link>
        <Link className="dark:text-white" to="/create-post">Create Post</Link>
        <Link className="dark:text-white" to="/contact">Contact</Link>
        <Link className="dark:text-white" to="/about">About</Link>
      </div>

      {/* Right: Icons & Subscribe */}
      <div className="flex items-center gap-4">
        <button className="hover:text-blue-500 dark:text-white">
          <Search size={20} />
        </button>
        
        <ThemeToggle />
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
