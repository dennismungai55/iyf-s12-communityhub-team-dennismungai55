
function PostCard({ post }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <small>Post ID: {post.id}</small>
    </article>
  );
}

export default PostCard;
