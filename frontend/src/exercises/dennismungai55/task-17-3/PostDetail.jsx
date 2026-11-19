import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await res.json();
        if (!isCancelled) {
          setPost(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchPost();

    return () => {
      isCancelled = true;
    };
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post || !post.id) return <p>Post not found.</p>;

  return (
    <article>
      <Link to="/posts">&larr; Back to Posts</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
