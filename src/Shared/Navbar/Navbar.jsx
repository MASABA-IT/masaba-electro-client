import React, { useEffect, useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";

import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../../providers/AppProviders";
const Navbar = ({ showSidebar, setShowSidebar }) => {
  const { userData, handleLogout, logo, BASE_URL, showWishlist } =
    useProductStore();
  // Your cartItems state (you can replace this with actual data)
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getCartFromLocalStorage = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cartData")) || [];
        setCartCount(storedCart.length);
      } catch (err) {
        console.error("Error reading cartData from localStorage:", err);
        setCartCount(0);
      }
    };

    getCartFromLocalStorage(); // Load initially

    // Optional: Poll every few hundred ms if no global context is syncing it
    const interval = setInterval(() => {
      getCartFromLocalStorage();
    }, 500);

    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (userData?.token) {
      navigate("/dashboard");
      // handleLogout(navigate);
    } else {
      navigate("/login");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in category:", category);
  };

  return (
    <nav className="navbar shadow-sm">
      {/* Desktop View */}
      <div className="hidden md:block nav-content">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden"
        >
          <IoMdMenu />
        </button>
        <div className="w-full  flex justify-between items-center  ">
          <div className="brand flex justify-center items-center gap-2 md:text-3xl lg:text-4xl font-black">
            <Link
              to="/"
              className="flex justify-center items-center gap-2 "
              style={{ textShadow: "1px 1px #333" }}
            >
              <img
                src={`${BASE_URL}/${logo}`}
                alt="Brand Logo"
                className="brand-logo md:w-12"
              />
              <span className="text-stone-600">Masaba </span>
              <span className="text-orange-400"> Bazar </span>
            </Link>
          </div>
          {/* Input field */}
          <div className="md:w-[50%] lg:w-auto h-14 flex items-center   border rounded-lg border-blue-500">
            {/* Input field */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full  h-full text-2xl py-3 px-4 rounded-lg focus:outline-none  "
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="h-full px-6  font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
          {/* icons */}
          <div className="nav-icons flex gap-x-6 justify-between items-center text-gray-500">
            {/* Profile Button */}
            <button
              className="flex flex-col items-center gap-y-3"
              onClick={handleButtonClick}
            >
              <FaUser
                className={`text-xl ${
                  userData?.token
                    ? "text-blue-400"
                    : "group-hover:text-blue-500"
                }`}
              />
              <span
                className={`text-sm uppercase font-bold font-mono ${
                  userData?.token
                    ? "text-blue-700"
                    : "group-hover:text-blue-500"
                }`}
                style={{ textShadow: "0px 1px 4px #f2f2f2" }}
              >
                {userData?.token
                  ? userData?.user?.name?.trim().split(" ").length === 1
                    ? userData.user.name
                    : userData.user.name
                        .trim()
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                  : "Login"}
              </span>
            </button>

            {/* Message Button */}
            {/* <button className="flex flex-col items-center gap-y-3 group hover:text-green-500">
              <MdMessage className="text-xl" />
              <span className="text-sm">Message</span>
            </button> */}

            {/* Orders Button */}
            <button className="flex flex-col items-center gap-y-3 group hover:text-purple-500">
              <FaHeart className="text-xl" />
              <span className="text-sm">Orders</span>
            </button>

            {/* Wishlist Button */}
            <button
              className="flex flex-col items-center gap-y-3 relative group hover:text-red-500"
              onClick={() => navigate("/wishlist")}
            >
              <FaHeart className="text-xl" />
              <span className="text-sm">Wishlist</span>
              {showWishlist.length > 0 && (
                <span
                  className="absolute -top-2 right-0 text-white text-xs bg-red-500 rounded-full w-6 h-6 p-3 flex items-center justify-center"
                  style={{ transform: "translate(50%, -50%)" }}
                >
                  {showWishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              className="flex flex-col items-center gap-y-3 relative group hover:text-orange-500"
              onClick={() => navigate("/cart")}
            >
              <HiMiniShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 right-0 text-white text-xs bg-red-500 rounded-full w-6 h-6 p-3 flex items-center justify-center"
                  style={{ transform: "translate(50%, -50%)" }}
                >
                  {cartCount}
                </span>
              )}
              <span className="text-sm">My Cart</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden nav-content">
        <div className="w-full flex-wrap flex gap-y-4 md:gap-y-0  justify-between items-center  ">
          <div>
            <div
              className="  flex justify-center items-center gap-2 text-4xl md:text-5xl font-black"
              style={{ textShadow: "1px 1px #333" }}
            >
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden "
              >
                <IoMdMenu />
              </button>
              <img
                src={`${BASE_URL}/${logo}`}
                alt="Brand Logo"
                className="brand-logo w-12 aspect-square"
              />
              <span className="text-stone-700">Masaba </span>
              <span className="text-orange-400"> Bazar </span>
            </div>
          </div>

          {/* icons */}
          <div className="nav-icons flex gap-x-6 justify-between items-center text-gray-500">
            <button className="flex flex-col items-center gap-y-3">
              <FaUser className=" " />
            </button>

            <button className="flex flex-col items-center gap-y-3">
              <HiMiniShoppingCart className=" " />
            </button>
          </div>
          {/* Input field */}
          <div className=" w-full h-14 flex items-center border-2   rounded-lg bg-gray-100">
            {/* Input field */}
            <IoIosSearch className="text-4xl ml-4 text-gray-500" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full h-full text-2xl py-3 px-4 rounded-lg focus:outline-none bg-transparent   "
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
