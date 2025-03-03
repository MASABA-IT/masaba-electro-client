import React, { useState } from "react";

import { IoMdMenu } from "react-icons/io";
const Navbar = ({ showSidebar, setShowSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in category:", category);
  };
  return (
    <nav className="navbar shadow-sm">
      <div className="nav-content">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden"
        >
          <IoMdMenu />
        </button>
        <div className="w-full flex justify-between items-center  ">
          <div className="brand flex justify-center items-center gap-2 text-5xl font-black">
            <img
              src="/src/assets/logo/nav-logo.svg"
              alt="Brand Logo"
              className="brand-logo"
            />
            <span>Brand</span>
          </div>
          {/* Input field */}
          <div className="h-20 flex items-center space-x-4 border border-blue-500">
            {/* Input field */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full h-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Divider */}
            <span className="h-full border-r"></span>

            {/* Category Select */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>

          <div className="flex gap-x-4 justify-between items-center">
            <div className="bg-red-200 p-4 ">profile</div>
            <div>message</div>
            <div>Mychart</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
