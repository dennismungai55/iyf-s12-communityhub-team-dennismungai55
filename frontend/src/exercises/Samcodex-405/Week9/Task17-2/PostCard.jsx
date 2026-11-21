import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <Link to={`/posts/${post.id}`}>
        Read More
      </Link>
    </article>
  );
}

export default PostCard;