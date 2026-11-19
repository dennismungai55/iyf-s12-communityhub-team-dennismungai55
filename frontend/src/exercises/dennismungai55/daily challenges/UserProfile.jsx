import { useEffect, useState } from "react";
import Tabs from "./Tabs";

export default function UserProfile({ userId = 1 }) {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProfileBundle() {
      try {
        setLoading(true);
        setError("");

        const [userRes, postsRes, todosRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            signal: controller.signal,
          }),
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
            signal: controller.signal,
          }),
          fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, {
            signal: controller.signal,
          }),
        ]);

        if (!userRes.ok || !postsRes.ok || !todosRes.ok) {
          throw new Error("Could not load user profile data.");
        }

        const [userData, postsData, todosData] = await Promise.all([
          userRes.json(),
          postsRes.json(),
          todosRes.json(),
        ]);

        setProfile(userData);
        setPosts(postsData);
        setTodos(todosData);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileBundle();
    return () => controller.abort();
  }, [userId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-sm text-slate-500">
        Loading profile for user #{userId}...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error || "User not found."}
      </div>
    );
  }

  const tabs = [
    {
      id: "info",
      label: "Info",
      content: (
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="font-medium text-slate-900">{profile.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Phone</dt>
            <dd className="font-medium text-slate-900">{profile.phone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Website</dt>
            <dd className="font-medium text-slate-900">{profile.website}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Company</dt>
            <dd className="font-medium text-slate-900">
              {profile.company?.name}
            </dd>
          </div>
        </dl>
      ),
    },
    {
      id: "posts",
      label: `Posts (${posts.length})`,
      content: (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border-b border-slate-100 pb-3 last:border-none"
            >
              <h3 className="font-semibold capitalize text-slate-900">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{post.body}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "todos",
      label: `Todos (${todos.length})`,
      content: (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="h-4 w-4 rounded border-slate-300"
              />
              <span
                className={
                  todo.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-800"
                }
              >
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-3xl space-y-5 p-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
        <p className="text-sm text-slate-500">
          @{profile.username} • {profile.address?.city}
        </p>
      </div>

      <Tabs tabs={tabs} defaultTab="info" />
    </section>
  );
}
