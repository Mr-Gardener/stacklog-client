import React, { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { Link } from "react-router-dom";

const MenuBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden fixed top-3 right-3 z-50">
      {/* Menu Toggle Button */}
      <button
        className="p-2 bg-[#77533a] text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menu Drawer */}
      <div
        className={`fixed top-6 left-0 h-[70%] w-64 bg-[#77533a] rounded-3xl text-white transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          {/* Top Section */}
          <div className="space-y-6">
            <Link to={""} className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>StackLog</span>
            </Link>
            <div className="flex flex-col mt-20">
                <Link to={""} className="mx-auto my-3">About</Link>
                <Link to={""} className="mx-auto my-3">Posts</Link>
                <Link to={""} className="mx-auto my-3">Contact</Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 my-4">
            <FaGithub />
            <FaTwitter />
            <FaLinkedin />
          </div>

          {/* Become an Author */}
          <button className="flex items-center justify-center gap-2 hover:underline">
            <TfiWrite />
            <span>Become an Author</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
