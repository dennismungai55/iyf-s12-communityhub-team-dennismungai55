import { useState, useMemo, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import About from "./pages/About";

const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=20";

export default function App() {
  const { data: remotePosts, loading, error, refetch } = useFetch(API_URL);

  const [localPosts, setLocalPosts] = useLocalStorage(
    "communityhub_local_posts",
    [],
  );
  const [likedIds, setLikedIds] = useLocalStorage("communityhub_liked_ids", []);
  const [searchQuery, setSearchQuery] = useState("");

  const allPosts = useMemo(() => {
    const apiList = Array.isArray(remotePosts) ? remotePosts : [];
    return [...localPosts, ...apiList];
  }, [localPosts, remotePosts]);

  const handleAddPost = useCallback(
    async ({ title, author, body }) => {
      const newPost = {
        id: `local-${Date.now()}`,
        userId: 1,
        title,
        author,
        body,
        isLocal: true,
      };

      // Optional API POST check without blocking local state
      try {
        await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body, userId: 1 }),
        });
      } catch {
        // Fallback smoothly to local state
      }

      setLocalPosts((prev) => [newPost, ...prev]);
    },
    [setLocalPosts],
  );

  const handleToggleLike = useCallback(
    (postId) => {
      const key = String(postId);
      setLikedIds((prev) =>
        prev.includes(key)
          ? prev.filter((item) => item !== key)
          : [...prev, key],
      );
    },
    [setLikedIds],
  );

  return (
    <BrowserRouter>
      <Layout
        postCount={allPosts.length}
        likedCount={likedIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                posts={allPosts}
                loading={loading}
                error={error}
                onRetry={refetch}
                likedIds={likedIds}
                onToggleLike={handleToggleLike}
              />
            }
          />
          <Route
            path="/posts"
            element={
              <Posts
                posts={allPosts}
                loading={loading}
                error={error}
                onRetry={refetch}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                likedIds={likedIds}
                onToggleLike={handleToggleLike}
              />
            }
          />
          <Route
            path="/posts/:id"
            element={
              <PostDetail
                posts={allPosts}
                loading={loading}
                error={error}
                likedIds={likedIds}
                onToggleLike={handleToggleLike}
              />
            }
          />
          <Route
            path="/create"
            element={<CreatePost onAddPost={handleAddPost} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
