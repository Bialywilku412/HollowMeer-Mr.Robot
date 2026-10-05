import { Link, Outlet } from "react-router";
import Navbar from "./Navbar";

export function Layout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}