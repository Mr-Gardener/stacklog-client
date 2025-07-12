import { useState } from "react";
import { FaGithub, FaLinkedin, FaXTwitter} from "react-icons/fa6";

const AboutMe = () => {
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "reviews">("about");

  return (
    <div className=" min-h-screen bg-gray-100 dark:bg-gray-900 py-30">
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl max-w-md mx-auto shadow-xl border dark:border-gray-800">
        {/* Avatar */}
        <div className="flex flex-col items-center">
            <img
            src="/saltina.jpg"
            alt="Saltina"
            className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-16 shadow-md"
            />
            <h2 className="text-xl font-bold mt-2 flex items-center gap-1 dark:text-white">
            Ekwe Saltina Ifechukwu
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Frontend/Fullstack Developer</p>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6 text-center">
            <div>
            <p className="text-lg font-semibold dark:text-white">1760</p>
            <p className="text-xs text-gray-500">Students</p>
            </div>
            <div>
            <p className="text-lg font-semibold dark:text-white">$149</p>
            <p className="text-xs text-gray-500">Hourly Rate</p>
            </div>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-4 mt-6 text-xl text-gray-600 dark:text-gray-300">
            <a href="https://github.com/Mr-Gardener" target="_blank" rel="noopener noreferrer">
                <FaGithub className="hover:text-black dark:hover:text-white" />
            </a>
            <a href="https://linkedin.com/in/ifechukwu-saltina-ekwe-651511348" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:text-blue-600" />
            </a>
            <a href="https://x.com/iamsaltina" target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="hover:text-black" />
            </a>
            <span className="rotate-45 text-lg">🔗</span>
            </div>

        {/* Tabs */}
        <div className="flex mt-6 border-b border-gray-200 dark:border-gray-700">
            {["about", "skills", "reviews"].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`w-full text-sm py-2 capitalize ${
                activeTab === tab ? "border-b-2 border-purple-400 text-purple-500 font-medium" : "text-gray-500"
                }`}
            >
                {tab === "about" ? "About me" : tab}
            </button>
            ))}
        </div>

        {/* Tab content */}
        <div className="mt-4">
            {activeTab === "about" && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
                I’m a results-driven Full-Stack Web Developer specializing in MERN stack development, responsive UIs, and conversion-focused designs — with a strong eye for UX, SEO, and performance optimization. <br />
                <br />
                Over the past 3+ years, I’ve built and deployed scalable web applications for startups, solo founders, and SaaS platforms, turning complex requirements into clean, production-ready solutions. Whether it's pixel-perfect Figma implementations, CMS-powered landing pages, or admin dashboards with role-based access, I get it done — fast. <br />
                <br />
                ✅ Recent Projects <br />
                CMS blog platform – With custom admin roles, clean UI, and optimized for Core Web Vitals. <br />
                <br />
                Food delivery app – From wireframe to deployment on Vercel/Render, fully responsive and optimized for mobile. <br />
                <br />
                Recruitment platform – Built with secure authentication, dynamic dashboards, and modular API design. <br />
                <br />
                Netflix clone – A polished, scroll-animated UI with lazy-loading, WebP optimization, and clean routing logic. <br />
                <br />
                🧩 What I Bring: <br />
                Responsive, mobile-first development with tools like TailwindCSS, Bootstrap, and Figma-to-code translation <br />
                <br />
                Frontend performance tuning (Lighthouse, PageSpeed Insights, lazy-loading, image optimization) <br />
                <br />
                Clean, scalable backend using Node.js, Express, MongoDB, and REST APIs <br />
                <br />
                Deployment expertise on platforms like Vercel, Netlify, and Render <br />
                <br />
                Strong version control with Git and collaborative workflow via Slack/Zoom <br />
                <br />
                💡 Tech Stack: <br />
                React.js, Next.js, Node.js, Express, MongoDB, PostgreSQL, TypeScript, TailwindCSS, Vite, Git, Netlify, Vercel, Render, JWT, REST APIs, Astro (learning), WordPress/Strapi (familiar) <br />
                <br />
                🎯 Ideal Fit For: <br />
                SaaS websites, landing pages, and admin panels that demand speed, scalability, and modern UI/UX <br />
                <br />
                Projects needing Core Web Vitals optimization, conversion strategy, or design-to-code implementation <br />
                <br />
                Teams looking for a self-starter who writes clean code, communicates clearly, and gets things done on time <br />
                <br />
                📩 Let’s chat about building something high-performing, beautiful, and user-first. <br />
            </p>
            )}
            {activeTab === "skills" && (
            <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                <li>React & TypeScript</li>
                <li>Node.js / Express</li>
                <li>MongoDB / PostgreSQL</li>
                <li>TailwindCSS</li>
                <li>System Design</li>
            </ul>
            )}
            {activeTab === "reviews" && (
            <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-sm dark:text-white">Dastan Jack – Product Manager</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    “Saltina was instrumental in bringing our MVP to life. HE not only built a reliable full-stack solution quickly but also made smart technical decisions that saved us time and budget. His React and Node.js skills are top-notch.”                </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-sm dark:text-white"> Sarah Lee – Junior Dev (mentored)</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    “I reached out to Saltina for help understanding JWT and API security. He explained everything clearly and reviewed my backend code. His feedback made me feel confident launching my first project.”                </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold text-sm dark:text-white"> Daniel Kim – Founder(SaaSify)</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    “What I love most is how Saltina approaches problems. He spotted issues in our codebase that even senior engineers missed. We now use his dev process as a standard for all future projects.”
                </p>
                </div>
            </div>
            )}
        </div>

        {/* Book button */}
        <a
        href="https://cal.com/saltina"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-6 bg-purple-500 text-white text-sm font-medium py-2 rounded-full hover:bg-purple-600 transition block text-center"
        >            
            Work With Me
        </a>
        </div>
    </div>
  );
};

export default AboutMe;
