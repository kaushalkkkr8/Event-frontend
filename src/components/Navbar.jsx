export default function Navbar() {
  return (
    <nav
      className="w-full px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-md"
      style={{ backgroundColor: 'rgb(173 127 81)' }}
    >
      {/* Logo/Title */}
      <div className="text-2xl font-bold text-white tracking-wide text-center md:text-left">
        Event Management
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center md:justify-center gap-6 text-base font-medium text-white flex-wrap">
        <a
          href="https://www.linkedin.com/in/kaushalkr8/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/kaushalkkkr8"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition"
        >
          GitHub
        </a>
        <a
          href="https://kaushalportfolio6.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition"
        >
          Portfolio
        </a>
      </div>
    </nav>
  );
}
