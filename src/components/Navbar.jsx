export default function Navbar() {
  return (
    <nav
      className="w-full px-6 py-3 relative flex items-center shadow-md"
      style={{ backgroundColor: 'rgb(173 127 81)' }}
    >
    
      <div className="text-2xl font-bold text-white ml-8 tracking-wide">
        <p> Event Management</p>
      </div>

    
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex gap-8 text-base font-medium">
          <a
            href="https://www.linkedin.com/in/kaushalkr8/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/kaushalkkkr8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline transition"
          >
            GitHub
          </a>
          <a
            href="https://kaushalportfolio6.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline transition"
          >
            Portfolio
          </a>
        </div>
      </div>
    </nav>
  );
}
