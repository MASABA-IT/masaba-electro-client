import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../shared/Navbar/Navbar";
import Sidebar from "../Shared/Sidebar/Sidebar";
import Footer from "../shared/Footer/Footer";
import NavbarHeader from "../Shared/NavbarHeader/NavbarHeader";

export default function Main() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="app">
      {/* Top Navbar */}{" "}
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <NavbarHeader />
      {/* Sidebar (Only for Mobile) */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {/* Main Content */}
      <main className="main-home">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
