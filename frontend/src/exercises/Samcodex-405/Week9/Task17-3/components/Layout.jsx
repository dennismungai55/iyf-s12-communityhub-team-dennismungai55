import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Layout() {
  return (
    <>
      <Navigation />

      <main>
        <Outlet />
      </main>

      <footer>
        <p>CommunityHub © 2026</p>
      </footer>
    </>
  );
}

export default Layout;