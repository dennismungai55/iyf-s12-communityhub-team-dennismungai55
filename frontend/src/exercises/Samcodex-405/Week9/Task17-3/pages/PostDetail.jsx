import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!response.ok) {
          throw new Error("Post not found");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link to="/posts">Back to posts</Link>
    </article>
  );
}

export default PostDetail;