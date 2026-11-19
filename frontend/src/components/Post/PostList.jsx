import PostCard from "./PostCard";

export default function PostList({
  posts = [],
  likedIds = [],
  likeCounts = {},
  onToggleLike,
  emptyMessage = "No posts found.",
}) {
  if (!posts.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const id = String(post.id);
        const isLiked = likedIds.includes(id);
        const baseLikes =
          typeof likeCounts[id] === "number" ? likeCounts[id] : 0;
        const displayLikes = baseLikes + (isLiked ? 1 : 0);

        return (
          <PostCard
            key={post.id}
            post={post}
            isLiked={isLiked}
            likeCount={displayLikes}
            onToggleLike={onToggleLike}
          />
        );
      })}
    </div>
  );
}
