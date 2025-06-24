import { useState } from "react";
import { Mail, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import React from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Blogs", to: "/" },
    { label: "Contact", to: "/contact" },
    { label: "About", to: "/about" },
  ];

  return (
    <>
      <nav className={`w-full flex justify-between items-center px-6 py-4 fixed top-0 z-0 
              backdrop-blur-sm bg-white/80 dark:bg-black/60 border-b 
              border-gray-200 dark:border-gray-800 ${isOpen ? "md:blur-sm md:pointer-events-none" : ""}`}
              >
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
          className="fixed inset-0 bg-black/50 z-40 flex"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-64 bg-white dark:bg-gray-900 h-full p-6 flex flex-col justify-between shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold dark:text-white">Menu</span>
                <button onClick={() => setIsOpen(false)} className="dark:text-white">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-300 mt-30">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="hover:text-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom section */}
            <div className="flex flex-col gap-4">
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

