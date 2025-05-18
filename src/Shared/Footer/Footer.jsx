import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { IoIosArrowUp, IoLogoYoutube, IoMdMenu } from "react-icons/io";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineMailOutline,
} from "react-icons/md";
import { useProductStore } from "../../providers/AppProviders";
import { Link } from "react-router-dom";
import appImg from "../../assets/imgs/Group.png";
import googleImg from "../../assets/imgs/market-button.png";

const Footer = () => {
  const { siteMeta, email, setEmail, BASE_URL, logo } = useProductStore();

  const MySwal = withReactContent(Swal);
  const handleSubscribe = async () => {
    if (!email) {
      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Please enter your email.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/mail/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        MySwal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Subscription successful!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#f0fdf4",
          didOpen: (toast) => {
            const titleEl = toast.querySelector(".swal2-title");
            titleEl.style.fontSize = "16px";
            titleEl.style.fontWeight = "600";
            titleEl.style.color = "#064e3b";
            toast.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            toast.style.borderRadius = "8px";
          },
        });

        setEmail("");
      } else {
        MySwal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Subscription failed. Try again later.",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            const titleEl = toast.querySelector(".swal2-title");
            titleEl.style.fontSize = "12px";
          },
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };
  const socialLinks = [
    {
      name: "facebook",
      icon: <FaFacebookF />,
      url: siteMeta?.social_facebook || "https://facebook.com",
      hoverColor: "text-blue-400",
    },
    {
      name: "twitter",
      icon: <FaTwitter />,
      url: siteMeta?.social_twitter || "https://twitter.com",
      hoverColor: "text-blue-400",
    },
    {
      name: "linkedin",
      icon: <FaLinkedinIn />,
      url: siteMeta?.social_linkedin || "https://linkedin.com",
      hoverColor: "text-blue-400",
    },
    {
      name: "instagram",
      icon: <FaInstagram />,
      url: siteMeta?.social_instagram || "https://instagram.com",
      hoverColor: "text-red-400",
    },
    // YouTube only if it exists
    ...(siteMeta?.social_youtube
      ? [
          {
            name: "youtube",
            icon: <IoLogoYoutube />,
            url: siteMeta?.social_youtube,
            hoverColor: "text-red-400",
          },
        ]
      : []),
  ];

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-full pl-10 outline-none text-black"
                onFocus={(e) => (e.target.previousSibling.style.opacity = "0")}
                onBlur={(e) => (e.target.previousSibling.style.opacity = "1")}
              />
            </div>

            {/* Subscribe Button */}
            <button
              onClick={() => handleSubscribe(email)}
              className="text-white bg-blue-500 p-2 md:px-4 md:py-2 rounded-md hover:bg-blue-600"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Second Section: Links & Brand Info */}
      <div className="w-full py-2 sm:py-4 ">
        <div className="footer_content grid grid-cols-2 gap-x-10  sm:gap-0  sm:grid-cols-4 lg:grid-cols-7 lg:gap-6   text-left px-4 sm:px-6">
          {/* Column 1: Quick Links */}
          <div className=" xs:col-span-3 md:col-span-2 lg:col-span-3 flex flex-col ">
            <div className="brand flex   items-center gap-2 text-xl md:text-3xl   font-black">
              <img
                src={`${BASE_URL}/${logo}`}
                alt="Brand Logo"
                className="brand-logo w-12 aspect-square"
              />
              <span className="">{siteMeta?.site_name}</span>
            </div>
            <p className="py-4 text-gray-500">{siteMeta?.site_description}</p>
            <ul className="social-links flex lg:justify-start items-center sm:gap-x-4 lg:gap-x-10">
              {socialLinks.map((link, index) => (
                <li key={index} className="group hover:cursor-pointer">
                  <a
                    href={link.url}
                    className={`text-gray-500 group-hover:${link.hoverColor} duration-100`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
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
                <Link to="/categories"> Categories </Link>
              </li>
              {/* <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                Blogs
              </li> */}
            </ul>
          </div>

          {/* Column 3: Partnership Info */}
          {/* <div className="text-2xl text-gray-400">
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
          </div> */}

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
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                <Link to="/signup">Register</Link>
              </li>

              <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out">
                <Link to="/cart">My Carts</Link>
              </li>
            </ul>
          </div>

          {/* Column 6: For App Info */}
          <div className="text-2xl text-gray-500">
            <h3 className="text-2xl font-semibold mb-3">Get App</h3>
            <ul className="flex flex-col gap-y-2">
              <li className="hover:scale-110 cursor-pointer transition-all duration-500 ease-in-out">
                <img
                  src={appImg}
                  alt="app Icon"
                  className="h-14 transition-all duration-500 ease-in-out"
                />
              </li>
              <li className="hover:scale-110 cursor-pointer transition-all duration-500 ease-in-out">
                <img
                  src={googleImg}
                  alt="google playstore Icon"
                  className="h-14 transition-all duration-500 ease-in-out"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Third Section: Copyright */}
      {/* <div className="bg-gray-100 w-full px-4">
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
            <span>BD &nbsp;</span>
            <IoIosArrowUp className="text-2xl" />
          </button>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
