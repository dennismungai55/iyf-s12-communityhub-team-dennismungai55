import { Routes, Route, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Layout from "./task-17-3/Layout";
import PostDetail from "./task-17-3/PostDetail";

function Home() {
  return (
    <section>
      <h1>Welcome to CommunityHub</h1>
      <p>Explore community posts and learn more about the platform.</p>
    </section>
  );
}

function Posts() {
  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(posts)) return <p>No posts found.</p>;

  return (
    <section>
      <h1>Posts</h1>
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function About() {
  return (
    <section>
      <h1>About CommunityHub</h1>
      <p>Built with React and React Router.</p>
    </section>
  );
}

function NotFound() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go back Home</Link>
    </section>
  );
}

export default function Task17_3Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:postId" element={<PostDetail />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
