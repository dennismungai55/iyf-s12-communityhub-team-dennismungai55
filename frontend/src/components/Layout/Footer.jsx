import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>
          CommunityHub Frontend · Built with React, Router &amp; Tailwind CSS
        </p>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-gray-800">
            Home
          </Link>
          <Link to="/posts" className="hover:text-gray-800">
            Posts
          </Link>
          <Link to="/about" className="hover:text-gray-800">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
