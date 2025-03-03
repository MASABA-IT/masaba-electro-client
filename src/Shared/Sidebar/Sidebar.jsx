import React from 'react';
import { RxCross1 } from "react-icons/rx";
const Sidebar = ({showSidebar, setShowSidebar}) => {
  return (
    <aside className={`sidebar ${showSidebar ? "show" : ""}`}>
    <button onClick={() => setShowSidebar(!showSidebar)} className=" ">
      <RxCross1 />
    </button>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Services</li>
      <li>Contact</li>
    </ul>
  </aside>
  );
};

export default Sidebar;