import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useProductStore } from "../../providers/AppProviders";

const NavbarHeader = () => {
  const { navCollections = [], loading } = useProductStore();
  const [waitCollections, setWaitCollections] = useState(true);

  // Optional: Add artificial delay to simulate loading (if needed)
  useEffect(() => {
    if (!loading && navCollections?.length > 0) {
      setWaitCollections(false);
    }
  }, [loading, navCollections]);

  const isLoading = loading || waitCollections;

  return (
    <div className="navbar_header">
      <div className="navbar_content flex justify-between px-2 overflow-x-auto lg:overflow-visible text-sm">
        <div className="flex justify-between items-center gap-x-4 mr-4 ">
          <button className="hidden lg:flex">
            <IoMdMenu />
          </button>
          <Link
            to="/categories"
            className="whitespace-nowrap   hover:text-blue-600 transition-all duration-300"
          >
            All Category
          </Link>
          {/* Map through buttonData and render each button as a link */}
          {isLoading || waitCollections
            ? // Show placeholder skeletons when loading
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-24 bg-gray-300 rounded animate-pulse mr-4"
                />
              ))
            : navCollections
                ?.slice()
                .reverse()
                .map((collection, index) => (
                  <Link
                    key={index}
                    to="/"
                    className="whitespace-nowrap hover:text-blue-600 transition-all duration-300"
                  >
                    {collection.title}
                  </Link>
                ))}

          {/* Help button with dropdown */}
          {/* <button className="flex items-center ">
            <span className="text-gray-700">Help</span>{" "}
            <MdOutlineKeyboardArrowDown />
          </button> */}
        </div>

        {/* <div className="flex gap-x-4 items-center">
          <button className="flex items-center">
            <span className="whitespace-nowrap">English, USD</span>{" "}
            <MdOutlineKeyboardArrowDown />
          </button>

          <button className="flex items-center">
            <span className="whitespace-nowrap">Ship to</span>
            <img
              className="w-10 mx-2 aspect-square"
              src="/src/assets/imgs/flag-1.png"
              alt="flag-1"
            />
            <MdOutlineKeyboardArrowDown />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default NavbarHeader;
