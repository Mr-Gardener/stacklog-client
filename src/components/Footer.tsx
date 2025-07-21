import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t dark:border-gray-800 pt-10 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-800 dark:text-gray-300">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/about" className="hover:text-purple-500">About Me</a></li>
            <li><a href="https://github.com/Mr-Gardener/stacklog-client/projects" target="_blank" className="hover:text-purple-500">Projects</a></li>
            <li><a href="/" className="hover:text-purple-500">Blog</a></li>
            <li><a href="/resume.pdf" target="_blank" className="hover:text-purple-500">Resume</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Services</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="https://cal.com/saltina" target="_blank" className="hover:text-purple-500">Work With Me</a></li>
            <li><a href="mailto:saltinaenquiries@gmail.com" className="hover:text-purple-500">Contact</a></li>
            <li  className="hover:text-purple-500">Subscribe</li>
          </ul>
        </div>

        {/* From the Dev Toolbox */}
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Toolbox</h4>
          <ul className="space-y-1 text-sm">
            <li>React / Next.js</li>
            <li>Node.js / Express</li>
            <li>MongoDB / PostgreSQL</li>
            <li>TailwindCSS / Figma</li>
            <li>Vercel / Render</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-4 px-4 pb-6 border-t dark:border-gray-800 pt-6">

        {/* Social icons */}
        <div className="flex gap-3">
          <a
            href="https://github.com/Mr-Gardener"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/in/ifechukwu-saltina-ekwe-651511348"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="https://x.com/iamsaltina"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaXTwitter size={16} />
          </a>
        </div>

        {/* Legal */}
        <div className="text-sm text-gray-800 dark:text-gray-400 mt-4 md:mt-0">
          <p className="mb-1">© {new Date().getFullYear()} Saltina Ifechukwu. All rights reserved.</p>
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


