import { useState } from "react";
import { Mail, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import React from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <Link to="/" className="text-sm font-medium hover:text-blue-500">
        Blogs
      </Link>
      <Link to="/contact" className="text-sm font-medium hover:text-blue-500">
        Contact
      </Link>
      <Link to="/about" className="text-sm font-medium hover:text-blue-500">
        About
      </Link>
    </>
  );

  return (
    <>
      <nav className="w-full flex justify-between items-center px-6 py-6 fixed top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-black/40 border-b border-gray-200 dark:border-gray-800">
        {/* Left: Site name */}
        <div className="text-2xl font-bold tracking-wide dark:text-white">
          <Link to="/">StackLog</Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex gap-8 dark:text-white">
          {navLinks}
        </div>

        {/* Right: Icons + Subscribe (desktop) */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="dark:text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div
            className="w-64 bg-white dark:bg-gray-900 h-full p-6 flex flex-col gap-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Site Name */}
            <div className="text-xl font-bold mb-4 dark:text-white">
              <Link to="/" onClick={() => setIsOpen(false)}>StackLog</Link>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
              {React.Children.map(navLinks.props.children, (child: any) =>
                React.cloneElement(child, { onClick: () => setIsOpen(false) })
              )}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <button className="hover:text-blue-500 dark:text-white">
                <Search size={20} />
              </button>
              <ThemeToggle />
              <Link
                to="/subscribe"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 border border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-all text-sm"
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

