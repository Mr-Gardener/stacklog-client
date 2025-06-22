import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:flex sm:items-center sm:justify-between">
        {/* Left */}
        <div className="text-sm">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-blue-600 dark:text-blue-400">Stacklog</span>. All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="mt-4 sm:mt-0 flex gap-4 text-sm">
          <Link to="/about" className="hover:text-blue-600 dark:hover:text-white transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600 dark:hover:text-white transition">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-white transition">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
