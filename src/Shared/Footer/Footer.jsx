import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { IoIosArrowUp, IoLogoYoutube, IoMdMenu } from "react-icons/io";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineMailOutline,
} from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer ">
      {/* First Section: Subscribe */}
      <div className="w-full bg-[#eef2f5]">
        <div className="footer_content py-10  flex flex-col gap-y-2 text-center mb-8 text-gray-600 text-2xl">
          <h2 className="text-3xl font-semibold mb-2  ">
            Subscribe on Our Newsletter
          </h2>
          <p className="  md:text-2xl mb-2">
            Get daily on upcoming offers from many suppliers all over the world
          </p>
          <div className="w-[90%] sm:w-full md:w-full mx-auto flex justify-center items-center gap-3">
            {/* Input with Icon Wrapper */}
            <div className="relative flex items-center border rounded-md px-4 py-3 w-full max-w-md bg-white">
              {/* Icon - Hidden on focus */}
              <MdOutlineMailOutline className="absolute left-4 text-gray-500 text-2xl transition-opacity duration-200" />

              {/* Input Field */}
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-full pl-10 outline-none text-black"
                onFocus={(e) => (e.target.previousSibling.style.opacity = "0")}
                onBlur={(e) => (e.target.previousSibling.style.opacity = "1")}
              />
            </div>

            {/* Subscribe Button */}
            <button className="text-white bg-blue-500 p-2 md:px-4 md:py-2 rounded-md hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Second Section: Links & Brand Info */}
      <div className="w-full py-2 sm:py-4">
        <div className="footer_content grid grid-cols-2 gap-x-10  sm:gap-0  sm:grid-cols-4 lg:grid-cols-7 lg:gap-6   text-left px-4 sm:px-6">
          {/* Column 1: Quick Links */}
          <div className=" sm:col-span-2 flex flex-col ">
            <div className="brand flex   items-center gap-2 text-3xl md:text-5xl font-black">
              <img
                src="/src/assets/logo/nav-logo.svg"
                alt="Brand Logo"
                className="brand-logo w-12 aspect-square"
              />
              <span>Brand</span>
            </div>
            <p className="py-4 text-gray-500">
              Best information about the company gies here but now lorem ipsum
              is
            </p>
            <ul className="social-links flex lg:justify-start items-center sm:gap-x-4 lg:gap-x-10">
              <li className="group hover:cursor-pointer">
                <a
                  href="#"
                  className="text-gray-500 group-hover:text-blue-400 duration-100"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li className="group hover:cursor-pointer">
                <a
                  href="#"
                  className="text-gray-500 group-hover:text-blue-400 duration-100"
                >
                  <FaTwitter />
                </a>
              </li>
              <li className="group hover:cursor-pointer">
                <a
                  href="#"
                  className="text-gray-500 group-hover:text-blue-400 duration-100"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="group hover:cursor-pointer">
                <a
                  href="#"
                  className="text-gray-500 group-hover:text-red-400 duration-100"
                >
                  <FaInstagram />
                </a>
              </li>
              <li className="group hover:cursor-pointer">
                <a
                  href="#"
                  className="text-gray-500 group-hover:text-red-400"
                  duration-100
                >
                  <IoLogoYoutube />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Our About */}
          <div className="text-2xl text-gray-400">
            <h3 className="text-2xl font-semibold mb-3 text-gray-600">About</h3>
            <ul>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                About Us
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Find Store
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Categories
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Blogs
              </li>
            </ul>
          </div>

          {/* Column 3: Partnership Info */}
          <div className="text-2xl text-gray-400">
            <h3 className="text-2xl font-semibold mb-3 text-gray-600">
              Partnership
            </h3>
            <ul>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Help Center
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Money Refund
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Shipping
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Column 4: Information Info */}
          <div className="text-2xl text-gray-400">
            <h3 className="text-2xl font-semibold mb-3 text-gray-600">
              Information
            </h3>
            <ul>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Help Center
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Money Refund
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Shipping
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Column 5: For Users Info */}
          <div className="text-2xl text-gray-400">
            <h3 className="text-2xl font-semibold mb-3 text-gray-600">
              For Users
            </h3>
            <ul>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Login
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Register
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Settings
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                My Orders
              </li>
            </ul>
          </div>

          {/* Column 6: For App Info */}
          <div className="text-2xl text-gray-500">
            <h3 className="text-2xl font-semibold mb-3">Get App</h3>
            <ul className="flex flex-col gap-y-2">
              <li className="hover:scale-110 cursor-pointer transition-all duration-500 ease-in-out">
                <img
                  src="/src/assets/imgs/Group.png"
                  alt=""
                  className="h-14 transition-all duration-500 ease-in-out"
                />
              </li>
              <li className="hover:scale-110 cursor-pointer transition-all duration-500 ease-in-out">
                <img
                  src="/src/assets/imgs/market-button.png"
                  alt=""
                  className="h-14 transition-all duration-500 ease-in-out"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Third Section: Copyright */}
      <div className="bg-gray-100 w-full px-4">
        <div className="footer_content flex justify-between text-center py-8">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Ecommerce.
          </p>
          <button className="flex items-center text-lg sm:text-xl">
            <img
              className=" w-10  mx-2 aspect-square"
              src="/src/assets/imgs/flag-1.png"
              alt="flag-1"
            />
            <span>English &nbsp;</span>
            <IoIosArrowUp className="text-2xl" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
