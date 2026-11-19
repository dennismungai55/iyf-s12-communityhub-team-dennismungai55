import { useEffect, useState } from "react";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (!debouncedQuery) return true;
    return (
      user.name.toLowerCase().includes(debouncedQuery) ||
      user.username.toLowerCase().includes(debouncedQuery) ||
      user.email.toLowerCase().includes(debouncedQuery)
    );
  });

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users by name, username, or email..."
        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />

      {loading && (
        <p className="mt-4 text-sm text-slate-500">Loading users...</p>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <ul className="mt-4 divide-y divide-slate-100">
          {filteredUsers.map((user) => (
            <li key={user.id} className="py-3">
              <p className="font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">
                @{user.username} • {user.email}
              </p>
            </li>
          ))}
          {filteredUsers.length === 0 && (
            <li className="py-4 text-sm text-slate-500">No matching users.</li>
          )}
        </ul>
      )}
    </div>
  );
}
