import React, { useEffect, useRef } from "react";
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
import { useProductStore } from "../../providers/AppProviders";
import { Link, useNavigate } from "react-router-dom";
import CategoryList from "../../components/CategoryList/CategoryList";
import MobileCategoryList from "../../components/MobileCategoryList/MobileCategoryList";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { userData, BASE_URL, setUserData, searchCategories } =
    useProductStore();
  const profileData = userData?.profile?.data;
  const user = userData?.user;

  const imagePath = profileData?.image || user?.image;
  const profileImg = imagePath ? `${BASE_URL}/${imagePath}` : null;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setShowSidebar(false);
    setUserData(null);
    navigate("/login");
  };

  const sidebarRef = useRef();

  // 👉 Close sidebar when clicking outside of it
  useEffect(() => {
    function handleOutsideClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    }

    if (showSidebar) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar, setShowSidebar]);
  return (
    <aside
      className={`sidebar ${showSidebar ? "show" : ""} bg-white  `}
      ref={sidebarRef}
    >
      <div className="flex flex-col px-10 relative backdrop-blur-md bg-white/20 border border-white/20 shadow-sm rounded-xl">
        {/* Close Button */}
        <button
          onClick={() => setShowSidebar(false)}
          className="close-btn absolute"
        >
          <RxCross1 className="text-4xl" />
        </button>

        {/* Top Profile Section */}
        <div
          className="profile-section  flex items-center justify-start gap-4 px-4 py-3 cursor-pointer   transition-all rounded-md w-full"
          onClick={() => {
            if (!userData?.token) {
              navigate("/login");
            }
          }}
        >
          {/* Left Side - Profile Image/Icon */}
          <div className="profile-section bg-[#eaecec] flex justify-center items-center">
            {userData?.token ? (
              <img
                src={profileImg}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
            ) : (
              <ImUser className="profile-icon text-5xl text-gray-700" />
            )}
          </div>

          {/* Right Side - Name and Text */}
          <div className="text-left overflow-hidden">
            <p className="text-lg font-semibold text-gray-800 truncate">
              {userData?.token ? userData.user?.name?.split(" ")[0] : "Guest"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {userData?.token ? "View Profile" : "Click to Login"}
            </p>
          </div>
        </div>

        {/* Sign In/Register */}
        <div className="auth-section text-2xl">
          {userData?.token ? (
            <button className="auth-btn text-red-500" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="auth-btn" onClick={() => navigate("/login")}>
                Sign In
              </button>
              <span>|</span>
              <button className="auth-btn" onClick={() => navigate("/signup")}>
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Navigation Sections */}
      <div className="nav-section px-10 text-2xl">
        <div className="nav-group border-b">
          <Link to="/" className="nav-item">
            <FaHome className="icon" /> <span>Home</span>
          </Link>
          <Link to="/categories" className="nav-item">
            <FaThList className="icon" /> <span>Categories</span>
          </Link>
          <Link to="/wishlist" className="nav-item">
            <FaRegHeart className="icon" /> <span>Favoriest</span>
          </Link>
          <Link to="/dashboard/orders/1" className="nav-item">
            <FaBoxOpen className="icon" /> <span>My Orders</span>
          </Link>
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
