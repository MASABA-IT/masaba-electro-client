import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  FaHome,
  FaThList,
  FaBoxOpen,
  FaGlobe,
  FaEnvelope,
  FaInfoCircle,
  FaRegHeart,
  FaListAlt,
  FaFolderOpen,
} from "react-icons/fa";
import { ImUser } from "react-icons/im";
import { useProductStore } from "../../providers/AppProviders";
import { Link, useNavigate } from "react-router-dom";
import CategoryList from "../../components/CategoryList/CategoryList";
import MobileCategoryList from "../../components/MobileCategoryList/MobileCategoryList";
import { TbPoint, TbPointFilled } from "react-icons/tb";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const {
    userData,
    BASE_URL,
    setUserData,
    searchCategories,
    navCollections = [],
    loading,
    setCollectionsId,
    setCategoryId,
    setSelectedCategories,
  } = useProductStore();
  const profileData = userData?.profile?.data;
  const user = userData?.user;

  const imagePath = profileData?.image || user?.image;

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
  //  const {
  //   navCollections = [],
  //   loading,
  //   setCollectionsId,
  //   setCategoryId,
  //   setSelectedCategories,
  // } = useProductStore();

  const [waitCollections, setWaitCollections] = useState(true);

  useEffect(() => {
    if (!loading && navCollections?.length > 0) {
      setWaitCollections(false);
    }
  }, [loading, navCollections]);

  const handleCollectionClick = (id) => {
    setSelectedCategories(null);
    setCollectionsId(id);
  };
  return (
    <aside
      className={`sidebar border ${showSidebar ? "show" : ""} bg-white  `}
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
                src={imagePath ? `${BASE_URL}/${imagePath}` : null}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
            ) : (
              <ImUser className="profile-icon text-5xl text-gray-700" />
            )}
          </div>

          {/* Right Side - Name and Text */}
          <div className="text-left overflow-hidden">
            <p className="text-2xl font-semibold text-gray-800 truncate">
              {userData?.token ? userData.user?.name?.split(" ")[0] : "Guest"}
            </p>
            <div
              className="cursor-pointer"
              onClick={() => {
                if (userData?.token) {
                  navigate("/dashboard");
                } else {
                  navigate("/login");
                }
                setShowSidebar(false);
              }}
            >
              <p className="text-lg text-red-400 truncate">
                {userData?.token ? "Welcome Back!" : "Click to Login ℹ️"}
              </p>
            </div>
          </div>
        </div>

        {/* Sign In/Register */}
      </div>
      <div className="w-full   px-6 py-6 bg-white   rounded-lg">
        {/* All Category Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            All Category
          </h3>
          <Link
            to="/categories"
            onClick={() => setCategoryId(1)}
            className="group flex items-center gap-3 text-xl text-gray-700 hover:text-blue-600 transition font-medium underline"
          >
            <FaListAlt className="text-blue-400 group-hover:text-blue-600" />
            All Categories
          </Link>
        </div>

        {/* All Collections Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
            All Collections
          </h3>

          <div className="flex flex-col gap-3  overflow-y-auto custom-scrollbar pr-1">
            {waitCollections
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 w-3/4 bg-gray-200 rounded animate-pulse "
                  />
                ))
              : navCollections
                  ?.slice()
                  .reverse()
                  .map((collection, index) => (
                    <Link
                      key={index}
                      to="/categories"
                      onClick={() => handleCollectionClick(collection.id)}
                      className="group flex items-center gap-3 text-xl text-gray-600 hover:text-blue-600 transition underline"
                    >
                      <TbPoint className="text-orange-600 " />
                      {collection.title.length > 25
                        ? collection.title.slice(0, 25) + "..."
                        : collection.title}
                    </Link>
                  ))}
          </div>
        </div>
      </div>
      {/* Main Navigation Sections */}
      <div className="nav-section px-10 text-xl border-t py-2">
        <div className="nav-group border-b">
          <div className="flex gap-x-4 py-1">
            <FaGlobe className="icon" /> <span>Bangladesh</span>
          </div>
          <div className="flex gap-x-4 py-1">
            <FaEnvelope className="icon" /> <span>Contact Us</span>
          </div>
          <div className="flex gap-x-4 py-1">
            <FaInfoCircle className="icon" /> <span>About</span>
          </div>
        </div>

        <div className="auth-section text-2xl">
          {userData?.token ? (
            <button
              className="auth-btn text-red-50 w-full bg-gray-500 p-4"
              onClick={handleLogout}
            >
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
    </aside>
  );
};

export default Sidebar;
