import { Link } from "react-router-dom";
import PostList from "../components/Post/PostList";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";

export default function Home({
  posts = [],
  loading = false,
  error = null,
  onRetry,
  likedIds = [],
  likeCounts = {},
  onToggleLike,
}) {
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome to CommunityHub
        </h1>
        <p className="text-blue-100 mb-6 max-w-2xl">
          Explore recent discussions from the community, search topics, like
          helpful posts, or start a new thread.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/posts">
            <Button variant="secondary">Explore All Posts</Button>
          </Link>
          <Link to="/create">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Create Post
            </Button>
          </Link>
        </div>
      </Card>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
          <Link
            to="/posts"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View all ({posts.length}) →
          </Link>
        </div>

        {loading && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
            Loading recent posts...
          </div>
        )}

        {error && !loading && (
          <Card title="Could not load posts">
            <p className="text-sm text-red-600 mb-4">{error}</p>
            {onRetry && (
              <Button size="small" onClick={onRetry}>
                Try Again
              </Button>
            )}
          </Card>
        )}

        {!loading && !error && (
          <PostList
            posts={recentPosts}
            likedIds={likedIds}
            likeCounts={likeCounts}
            onToggleLike={onToggleLike}
          />
        )}
      </section>
    </div>
  );
}
