import React from "react";
import { RxCross1 } from "react-icons/rx";
import {
  FaHome,
  FaThList,
  FaBoxOpen,
  FaGlobe,
  FaEnvelope,
  FaInfoCircle,
  FaRegHeart,
} from "react-icons/fa";
import { ImUser } from "react-icons/im";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  return (
    <aside className={`sidebar ${showSidebar ? "show" : ""} bg-white  `}>
      <div className="flex flex-col bg-[#eef2f5] px-10 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowSidebar(false)}
          className="close-btn absolute"
        >
          <RxCross1 className="text-4xl" />
        </button>

        {/* Top Profile Section */}
        <div className="profile-section bg-[#BDC4CD]">
          <ImUser className="profile-icon " />
        </div>

        {/* Sign In/Register */}
        <div className="auth-section text-2xl">
          <button className="auth-btn">Sign In </button>
          <span>|</span>
          <button className="auth-btn"> Register </button>
        </div>
      </div>

      {/* Main Navigation Sections */}
      <div className="nav-section px-10 text-2xl">
        <div className="nav-group border-b">
          <div className="nav-item">
            <FaHome className="icon" /> <span>Home</span>
          </div>
          <div className="nav-item">
            <FaThList className="icon" /> <span>Categories</span>
          </div>
          <div className="nav-item">
            <FaRegHeart className="icon" /> <span>Favoriest</span>
          </div>
          <div className="nav-item">
            <FaBoxOpen className="icon" /> <span>My Orders</span>
          </div>
        </div>

        <div className="nav-group border-b">
          <div className="nav-item">
            <FaGlobe className="icon" /> <span>English | USD</span>
          </div>
          <div className="nav-item">
            <FaEnvelope className="icon" /> <span>Contact Us</span>
          </div>
          <div className="nav-item">
            <FaInfoCircle className="icon" /> <span>About</span>
          </div>
        </div>

        <div className="nav-group text-only ml-10">
          <button className="text-link text-start ">User Agreement</button>
          <button className="text-link text-start ">Partnership</button>
          <button className="text-link text-start ">Privacy Policy</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
