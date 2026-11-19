import { Link } from "react-router-dom";
import Card from "../shared/Card";
import Avatar from "../shared/Avatar";

export default function Sidebar({
  totalPosts = 0,
  likedCount = 0,
  searchQuery = "",
  onSearchChange,
}) {
  return (
    <aside className="space-y-6">
      <Card title="Community Snapshot" subtitle="Live hub activity">
        <div className="flex items-center gap-3 mb-4">
          <Avatar name="Dennis Mungai" size="medium" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Dennis Mungai</p>
            <p className="text-xs text-gray-500">Frontend Builder</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-center">
          <div className="bg-gray-50 rounded-lg p-2.5">
            <dt className="text-xs text-gray-500">Total Posts</dt>
            <dd className="text-lg font-bold text-gray-900">{totalPosts}</dd>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <dt className="text-xs text-gray-500">Liked Posts</dt>
            <dd className="text-lg font-bold text-blue-600">{likedCount}</dd>
          </div>
        </dl>
      </Card>

      {typeof onSearchChange === "function" && (
        <Card title="Quick Filter">
          <label htmlFor="sidebar-search" className="sr-only">
            Filter posts
          </label>
          <input
            id="sidebar-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter by title or body..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="mt-2 text-xs text-blue-600 hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          )}
        </Card>
      )}

      <Card title="Quick Links">
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/posts" className="text-blue-600 hover:underline">
              Browse all community posts →
            </Link>
          </li>
          <li>
            <Link to="/create" className="text-blue-600 hover:underline">
              Share a new discussion post →
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-blue-600 hover:underline">
              Learn about CommunityHub →
            </Link>
          </li>
        </ul>
      </Card>
    </aside>
  );
}
