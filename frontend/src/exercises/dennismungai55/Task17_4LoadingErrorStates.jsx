import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ErrorMessage from "../../components/shared/ErrorMessage";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
    </article>
  );
}

export function PostList({
  url = "https://jsonplaceholder.typicode.com/posts",
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts (HTTP ${response.status})`);
      }

      const data = await response.json();
      setPosts(Array.isArray(data) ? data.slice(0, 10) : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <LoadingSpinner text="Loading posts..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPosts} />;
  if (posts.length === 0) return <p>No posts found.</p>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function Task17_4LoadingErrorStates() {
  const [endpoint, setEndpoint] = useState(
    "https://jsonplaceholder.typicode.com/posts",
  );

  return (
    <div>
      <h2>Task 17.4: Loading &amp; Error States</h2>
      <div>
        <button
          type="button"
          onClick={() =>
            setEndpoint("https://jsonplaceholder.typicode.com/posts")
          }
        >
          Load Valid Posts
        </button>
        <button
          type="button"
          onClick={() =>
            setEndpoint("https://jsonplaceholder.typicode.com/invalid-endpoint")
          }
        >
          Trigger Error State
        </button>
      </div>
      <PostList url={endpoint} />
    </div>
  );
}
