function PostCard({
  title = "Untitled Post",
  author = "Anonymous",
  content = "No content available."
}) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
      <small>Posted by: {author}</small>
    </article>
  );
}

export default PostCard;