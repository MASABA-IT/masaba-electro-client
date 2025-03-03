import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h2>Navbar</h2>
      <Outlet />
      <h2 className="text-amber-500">Footer</h2>
    </div>
  );
};

export default Main;
