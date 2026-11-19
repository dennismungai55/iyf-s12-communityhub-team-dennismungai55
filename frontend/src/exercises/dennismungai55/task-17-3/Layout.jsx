import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored auth/user state if needed
    navigate("/");
  };

  return (
    <div className="layout">
      <header>
        <nav aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Posts
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; 2026 CommunityHub</p>
      </footer>
    </div>
  );
}
