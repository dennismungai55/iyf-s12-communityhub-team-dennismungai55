import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <h2>CommunityHub</h2>

      <NavLink to="/">Home</NavLink>{" | "}
      <NavLink to="/posts">Posts</NavLink>{" | "}
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}

export default Navigation;