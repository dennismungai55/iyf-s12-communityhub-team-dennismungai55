import { useParams, Link, useNavigate } from "react-router-dom";
import Card from "../components/shared/Card";
import Avatar from "../components/shared/Avatar";
import Button from "../components/shared/Button";

export default function PostDetail({
  posts = [],
  loading = false,
  error = null,
  likedIds = [],
  likeCounts = {},
  onToggleLike,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((item) => String(item.id) === String(id));

  if (loading && !post) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
        Loading post details...
      </div>
    );
  }

  if (!post) {
    return (
      <Card title="Post Not Found">
        <p className="text-sm text-gray-600 mb-4">
          {error || `We couldn't find a post with ID "${id}".`}
        </p>
        <Link to="/posts">
          <Button variant="primary" size="small">
            ← Back to All Posts
          </Button>
        </Link>
      </Card>
    );
  }

  const postKey = String(post.id);
  const isLiked = likedIds.includes(postKey);
  const baseLikes =
    typeof likeCounts[postKey] === "number" ? likeCounts[postKey] : 0;
  const totalLikes = baseLikes + (isLiked ? 1 : 0);
  const authorName = post.author || `Member #${post.userId || 1}`;

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="small" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card
        footer={
          <div className="w-full flex items-center justify-between gap-3">
            <Button
              variant={isLiked ? "primary" : "outline"}
              size="small"
              onClick={() => onToggleLike?.(post.id)}
            >
              {isLiked ? "♥ Liked" : "♡ Like Post"} ({totalLikes})
            </Button>

            <Link to="/posts" className="text-sm text-blue-600 hover:underline">
              All Posts →
            </Link>
          </div>
        }
      >
        <div className="flex items-center gap-3 mb-4">
          <Avatar name={authorName} size="medium" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-500">Post #{post.id}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
          {post.title}
        </h1>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.body}
        </p>
      </Card>
    </div>
  );
}
