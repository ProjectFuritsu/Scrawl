import { useState } from "react";
import { Link, useLocation } from "react-router";

const NAV_LINKS = [{ label: "Our Story", path: "/our-story" }];

const BOARDS = [
  { label: "🧱 The Classic", path: "/wall", isOpen: true },
  { label: "💝 Valentine's", path: "/wall/valentines", isOpen: true },
  { label: "🎄 Christmas", path: "/wall/christmas", isOpen: true },
  { label: "🎃 Halloween", path: "/wall/halloween", isOpen: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top row — logo + main links */}
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl">🖍️</span>
            <span className="text-xl font-extrabold text-orange-400 tracking-tight group-hover:text-orange-500 transition-colors">
              Scrawl
            </span>
          </Link>

          {/* Desktop — info links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-all
                  ${
                    isActive(path)
                      ? "text-orange-500 bg-orange-50"
                      : "text-gray-500 hover:text-orange-400 hover:bg-orange-50"
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-400 hover:text-orange-400 hover:bg-orange-50 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom row — seasonal boards (desktop) */}
        <div className="hidden md:flex items-center gap-2 pb-2.5 overflow-x-auto">
          <span className="text-xs text-gray-300 font-semibold mr-1 shrink-0">
            Walls
          </span>
          {BOARDS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all whitespace-nowrap shrink-0
                ${
                  isActive(path)
                    ? "bg-orange-100 border-orange-300 text-orange-500"
                    : "border-gray-200 text-gray-400 hover:border-orange-300 hover:text-orange-400 hover:bg-orange-50"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-orange-50 py-3 flex flex-col gap-1">
            {/* Info links */}
            <p className="text-xs font-bold text-gray-300 px-3 mb-1 uppercase tracking-wider">
              Menu
            </p>
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold px-4 py-2.5 rounded-xl transition-all
                  ${
                    isActive(path)
                      ? "bg-orange-50 text-orange-500"
                      : "text-gray-500 hover:bg-orange-50 hover:text-orange-400"
                  }`}
              >
                {label}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-orange-50 my-2" />

            {/* Boards */}
            <p className="text-xs font-bold text-gray-300 px-3 mb-1 uppercase tracking-wider">
              Boards
            </p>
            {BOARDS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all
                  ${
                    isActive(path)
                      ? "bg-orange-100 border-orange-300 text-orange-500"
                      : "border-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-400 hover:border-orange-200"
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
