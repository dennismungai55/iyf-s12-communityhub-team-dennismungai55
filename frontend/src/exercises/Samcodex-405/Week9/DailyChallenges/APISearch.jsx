import { useEffect, useState } from "react";

function APISearch() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function searchPosts() {
      if (!query.trim()) {
        setPosts([]);
        setLoading(false);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setPosts(data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(searchPosts, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <section>
      <h2>Search Posts</h2>

      <label htmlFor="post-search">Search by title or content</label>

      <input
        id="post-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter search term..."
      />

      {loading && <p>Searching...</p>}
      {error && <p role="alert">{error}</p>}

      {posts.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}

      {!loading && query.trim() && posts.length === 0 && !error && (
        <p>No matching posts found.</p>
      )}
    </section>
  );
}

export default APISearch;
