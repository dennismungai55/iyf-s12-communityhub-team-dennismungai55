import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
    </article>
  );
}

// Exercise 1: Fetch Posts from API
export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        if (!isCancelled) {
          setPosts(data.slice(0, 10));
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

    fetchPosts();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// Exercise 2: Custom Fetch Hook Usage
export function PostListWithHook() {
  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(posts)) return <p>No posts available.</p>;

  return (
    <div className="post-list">
      {posts.slice(0, 10).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function Task17_2DataFetching() {
  return (
    <div>
      <h2>Task 17.2: Data Fetching in React</h2>
      <h3>Exercise 1: Fetch Posts from API</h3>
      <PostList />
      <h3>Exercise 2: Custom useFetch Hook</h3>
      <PostListWithHook />
    </div>
  );
}
