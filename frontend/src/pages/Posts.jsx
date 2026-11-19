import { useMemo } from "react";
import Input from "../components/shared/Input";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import PostList from "../components/Post/PostList";

export default function Posts({
  posts = [],
  loading = false,
  error = null,
  onRetry,
  searchQuery = "",
  onSearchChange,
  likedIds = [],
  likeCounts = {},
  onToggleLike,
}) {
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(q) ||
        post.body?.toLowerCase().includes(q) ||
        post.author?.toLowerCase().includes(q),
    );
  }, [posts, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
        <p className="text-sm text-gray-500 mt-1">
          Showing {filteredPosts.length} of {posts.length} posts
        </p>
      </div>

      <Input
        name="searchPosts"
        placeholder="Search posts by keyword, title, or author..."
        value={searchQuery}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />

      {loading && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          Fetching posts from API...
        </div>
      )}

      {error && !loading && (
        <Card title="Error loading posts">
          <p className="text-sm text-red-600 mb-4">{error}</p>
          {onRetry && (
            <Button size="small" onClick={onRetry}>
              Retry
            </Button>
          )}
        </Card>
      )}

      {!loading && !error && (
        <PostList
          posts={filteredPosts}
          likedIds={likedIds}
          likeCounts={likeCounts}
          onToggleLike={onToggleLike}
          emptyMessage={
            searchQuery
              ? `No posts match "${searchQuery}".`
              : "No posts available yet."
          }
        />
      )}
    </div>
  );
}
