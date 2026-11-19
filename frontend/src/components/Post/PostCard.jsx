import { Link } from "react-router-dom";
import Card from "../shared/Card";
import Avatar from "../shared/Avatar";
import Button from "../shared/Button";

export default function PostCard({
  post,
  isLiked = false,
  likeCount = 0,
  onToggleLike,
}) {
  const authorName = post.author || `Member #${post.userId || 1}`;
  const excerpt =
    post.body && post.body.length > 150
      ? `${post.body.slice(0, 150).trim()}...`
      : post.body;

  return (
    <Card
      footer={
        <div className="w-full flex items-center justify-between gap-2">
          <Button
            variant={isLiked ? "primary" : "ghost"}
            size="small"
            onClick={() => onToggleLike?.(post.id)}
          >
            {isLiked ? "♥ Liked" : "♡ Like"} ({likeCount})
          </Button>

          <Link to={`/posts/${post.id}`}>
            <Button variant="outline" size="small">
              Read Post →
            </Button>
          </Link>
        </div>
      }
    >
      <div className="flex items-center gap-2.5 mb-3">
        <Avatar name={authorName} size="small" />
        <div className="text-xs text-gray-500">
          <span className="font-medium text-gray-800">{authorName}</span>
          {post.isLocal && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
              New Post
            </span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
        <Link
          to={`/posts/${post.id}`}
          className="hover:text-blue-600 transition-colors"
        >
          {post.title}
        </Link>
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">{excerpt}</p>
    </Card>
  );
}
