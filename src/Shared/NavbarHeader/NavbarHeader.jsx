import React from "react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const NavbarHeader = () => {
  // Array of button data, you can add links and other data here
  const buttonData = [
    { text: "All Category", link: "/categories" },
    { text: "Hot Offers", link: "/offers" },
    { text: "Gift Boxes", link: "/gift-boxes" },
    { text: "Projects", link: "/projects" },
    { text: "Menu Item", link: "/menu-item" },
    { text: "Help", link: "/help" },
  ];

  return (
    <div className="navbar_header">
      <div className="navbar_content flex justify-between px-2 overflow-x-auto lg:overflow-visible text-sm">
        <div className="flex justify-between items-center gap-x-4">
          <button className="hidden lg:flex">
            <IoMdMenu />
          </button>

          {/* Map through buttonData and render each button as a link */}
          {buttonData.map((button, index) => (
            <Link
              key={index}
              to={button.link}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300"
            >
              {button.text}
            </Link>
          ))}

          {/* Help button with dropdown */}
          <button className="flex items-center">
            <span>Help</span> <MdOutlineKeyboardArrowDown />
          </button>
        </div>

        <div className="flex gap-x-4 items-center">
          <button className="flex items-center">
            <span>English, USD</span> <MdOutlineKeyboardArrowDown />
          </button>

          <button className="flex items-center">
            <span>Ship to</span>
            <img
              className="w-10 mx-2 aspect-square"
              src="/src/assets/imgs/flag-1.png"
              alt="flag-1"
            />
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
