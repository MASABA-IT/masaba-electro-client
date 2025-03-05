import React, { useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";

import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { MdMessage } from "react-icons/md";
const Navbar = ({ showSidebar, setShowSidebar }) => {
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
          <div className="brand flex justify-center items-center gap-2 md:text-3xl lg:text-5xl font-black">
            <img
              src="/src/assets/logo/nav-logo.svg"
              alt="Brand Logo"
              className="brand-logo md:w-12"
            />
            <span>Brand</span>
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

            {/* Divider */}
            <span className="w-0  h-full border-r border-blue-500"></span>

            {/* Category Select */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" h-full px-2 rounded-sm focus:outline-none  "
            >
              <option value="All">All</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
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
            <button className="flex flex-col items-center gap-y-3">
              <FaUser className=" " />
              <span className="text-sm">Profile</span>
            </button>
            <button className="flex flex-col items-center gap-y-3">
              <MdMessage className=" " />
              <span className="text-sm">Message</span>
            </button>
            <button className="flex flex-col items-center gap-y-3">
              <FaHeart className=" " />
              <span className="text-sm">Orders</span>
            </button>
            <button className="flex flex-col items-center gap-y-3">
              <HiMiniShoppingCart className=" " />
              <span className="text-sm">My Cart</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden nav-content">
        <div className="w-full flex-wrap flex gap-y-4 md:gap-y-0  justify-between items-center  ">
          <div>
            <div className="brand flex justify-center items-center gap-2 text-3xl md:text-5xl font-black">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden "
              >
                <IoMdMenu />
              </button>
              <img
                src="/src/assets/logo/nav-logo.svg"
                alt="Brand Logo"
                className="brand-logo w-12 aspect-square"
              />
              <span>Brand</span>
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
