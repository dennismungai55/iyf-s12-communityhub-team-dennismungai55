import { NavLink, Link } from "react-router-dom";
import Button from "../shared/Button";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/posts", label: "Posts" },
  { to: "/about", label: "About" },
];

export default function Header({ postCount = 0 }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-lg">
            C
          </span>
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            CommunityHub
          </span>
          <span className="hidden sm:inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
            {postCount} posts
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1 sm:gap-2"
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/create" className="shrink-0">
          <Button size="small" variant="primary">
            + New Post
          </Button>
        </Link>
      </div>
    </header>
  );
}
