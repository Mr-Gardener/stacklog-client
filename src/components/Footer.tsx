import { FaTwitter, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t dark:border-gray-800 pt-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700 dark:text-gray-300">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center mb-2">
            <div className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold mr-2">
              ✦
            </div>
            <div>
              <p className="font-semibold">Daily feed of webdesign inspiration & fonts</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">A project by Bertrand Bruandet</p>
            </div>
          </div>
        </div>

        {/* Navigation columns */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Navigation</h4>
          <ul className="space-y-1 text-sm">
            <li>About</li>
            <li>Subscribe</li>
            <li>Design jobs</li>
            <li>Submit website</li>
            <li>Advertise on MaxiBestOf</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Navigation</h4>
          <ul className="space-y-1 text-sm">
            <li>Webdesign inspiration gallery</li>
            <li>Popular websites</li>
            <li>Popular fonts</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">From the community</h4>
          <ul className="space-y-1 text-sm">
            <li>Saas Inspiration library</li>
            <li>Product & design job board</li>
            <li>Website bookmarking tool</li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-4 px-4 pb-6 border-t dark:border-gray-800 pt-6">
        {/* Social icons */}
        <div className="flex gap-3">
          {[FaTwitter, FaPinterestP, FaLinkedinIn,].map((Icon, i) => (
            <button
              key={i}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        {/* Legal + Tools */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:mt-0">
          <p className="mb-1">© 2025 MaxiBestOf. All rights reserved.</p>
        </div>

        {/* Scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <IoIosArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

