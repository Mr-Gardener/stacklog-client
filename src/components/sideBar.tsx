import React, { useEffect, useState } from "react";
import { Home, Menu } from "lucide-react"; // Optional: icon library
import { FaXTwitter } from "react-icons/fa6";
import { LuLinkedin } from "react-icons/lu";
import { FaGithubAlt } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  const socialIcons =[
    <FaXTwitter key="twitter" className="text- text-black" />,
    <FaGithubAlt key="github" className="text- text-black" />,
    <LuLinkedin key="linkedin" className="text- text-black" />
  ];


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled && !isExpanded) {
      const interval = setInterval(() => {
        setActiveIcon((prev) => (prev + 1) % socialIcons.length);
      }, 1000);

      return () => clearInterval(interval);

    }
  }, [isScrolled, isExpanded]);

  const sidebarCollapsed = isScrolled && !isExpanded;
  const sidebarWidth = isScrolled && !isExpanded ? "w-15" : "w-55";

    return (
      <div className={`hidden lg:flex flex-col fixed top-3 left-3 h-[95%] rounded-3xl  text-white transition-all duration-300 ${sidebarWidth}`}>
        
        {/* Top: Navigation - 75% height */}
        <div className="flex-1 p-4 bg-[#77533a] rounded-4xl ">
          <Link to={""} className="flex items-center space-x-2 mb-4">
            <Home className="w-5 h-5" />
            {!isScrolled || isExpanded ? <span>StackLog</span> : null}
          </Link>

          {/* Nav Links */}
          {!isScrolled || isExpanded ? (
            <div className="flex flex-col space-y-4 mt-35">
              <button>About</button>
              <button>Posts</button>
              <button>Contact</button>
            </div>
          ) : null}

          {/* Show menu button only when shrunk */}
          {isScrolled && (
            <button onClick={() => setIsExpanded(prev => !prev)} className="mt-85 ">
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* social icons  */}
        <div className="h-[50px] bg-[#e4c19a] rounded-4xl flex justify-center items-center ">
            {sidebarCollapsed ? (
              <div className="animate-fade-in transition-opacity duration-500">
                {socialIcons[activeIcon]}
              </div>
            ) : (
              <div className="flex space-x-3">
                {socialIcons.map((icon, index) => (
                  <div key={index}>{icon}</div>
                ))}
              </div>
            )}
        </div>

        {/* Become an Author section  */}
          <div className="p-4 text-center text-xs bg-[#77533a] rounded-4xl">
            {sidebarCollapsed ? (
              <TfiWrite className="mx-auto text-lg " />
            ) : (
              <Link to={"/one-time-admin"} className="">Become a Contributor</Link>
            )}
          </div>

      </div>
    );
    }

export default Sidebar;
