import { useState, useEffect } from "react";
import { Mail, Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onSearchToggle: () => void;
}

const Navbar = ({ onSearchToggle }: NavbarProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Blogs", to: "/" },
    { label: "About", to: "/about" },
  ];

  // Optional: keyboard shortcut to open search
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        onSearchToggle();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [onSearchToggle]);

  return (
    <>
      <nav className={`w-full flex justify-between items-center px-6 py-4 fixed top-0 z-50
        backdrop-blur-sm bg-white/80 dark:bg-black/60 border-b 
        border-gray-200 dark:border-gray-800`}>
        {/* Site name */}
        <div className="text-2xl font-bold tracking-wide dark:text-white">
          <Link to="/">StackLog</Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center dark:text-white">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium hover:text-blue-500"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4 dark:text-white">
          <button onClick={onSearchToggle} className="hover:text-blue-500">
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

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)} className="dark:text-white">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 flex dark:text-white"
    onClick={() => setIsOpen(false)}
  >
    <div
      className="w-64 bg-white dark:bg-gray-900 h-full p-6 flex flex-col justify-between shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top */}
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold dark:text-white">Menu</span>
          <button onClick={() => setIsOpen(false)} className="dark:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-300 mt-30">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`transition-colors duration-200  ${
                  isActive
                    ? "text-purple-500 font-medium"
                    : "hover:text-purple-400 dark:hover:text-purple-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4 mt-6">
        <button onClick={onSearchToggle} className="dark:text-white text-gray-700 dark:hover:text-purple-400 transition">
          <Search size={20} />
        </button>
        <ThemeToggle />
        <Link
          to="/subscribe"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center gap-1 border border-purple-500 text-purple-500 px-3 py-1 rounded-full hover:bg-purple-500 hover:text-white transition text-sm"
        >
          <Mail size={16} />
          Subscribe
        </Link>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;

