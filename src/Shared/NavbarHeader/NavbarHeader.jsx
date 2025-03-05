import React from "react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const NavbarHeader = () => {
  return (
    <div className="navbar_header">
      <div className="navbar_content flex justify-between  px-2  overflow-x-auto lg:overflow-visible text-sm">
        <div className=" flex justify-between items-center gap-x-2">
          <button className="hidden lg:flex ">
            <IoMdMenu />
          </button>
          <button className="">All&nbsp;Category</button>
          <button>Hot&nbsp;Offers</button>
          <button>Gift&nbsp;Boxes</button>
          <button>Projects</button>
          <button>Menu&nbsp;Itewm</button>
          <button className="flex items-center">
            <span>Help</span> <MdOutlineKeyboardArrowDown />
          </button>
        </div>
        <div className="flex gap-x-4 items-center">
          <button className="flex items-center">
            <span>English,&nbsp;USD</span> <MdOutlineKeyboardArrowDown />
          </button>
          <button className="flex items-center">
            <span> Ship&nbsp;to </span>
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
