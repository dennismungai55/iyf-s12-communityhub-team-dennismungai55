import { createContext, useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(
    () => localStorage.getItem("demo_username") || "",
  );

  const login = (name) => {
    const clean = name.trim();
    if (!clean) return;
    localStorage.setItem("demo_username", clean);
    setUsername(clean);
  };

  const logout = () => {
    localStorage.removeItem("demo_username");
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{ username, isAuthenticated: Boolean(username), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function AuthHeader() {
  const { username, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <Link to="/" className="font-semibold text-slate-900">
        CommunityHub
      </Link>
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="text-sm font-medium text-slate-700">
              Signed in as{" "}
              <strong className="text-indigo-600">@{username}</strong>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export function LoginPage() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/profile/1";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
    navigate(redirectTo, { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h1 className="text-lg font-semibold text-slate-900">Sign In</h1>
      <p className="mt-1 text-xs text-slate-500">
        Enter any username to simulate authentication.
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. dennis"
        className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Continue
      </button>
    </form>
  );
}
