import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaThList, FaRegHeart, FaUser } from "react-icons/fa";

const MobileBottomNav = () => {
  const [token, setToken] = useState(null); // Add token state

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setToken(parsedData.token || null);
    }
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t shadow-md flex justify-around items-center h-20 md:hidden">
      <Link to="/" className="flex flex-col items-center text-xl text-gray-100">
        <FaHome className="text-xl" />
        Home
      </Link>
      <>
        {token ? (
          <Link
            to="/dashboard/orders/1"
            className="flex flex-col items-center text-xl text-gray-100"
          >
            <FaThList className="text-xl" />
            Orders
          </Link>
        ) : (
          <Link
            to="/cart"
            className="flex flex-col items-center text-xl text-gray-100"
          >
            <FaThList className="text-xl" />
            Cart
          </Link>
        )}
      </>

      <Link
        to="/wishlist"
        className="flex flex-col items-center text-xl text-gray-100"
      >
        <FaRegHeart className="text-xl" />
        Wishlist
      </Link>
      <Link
        to="/dashboard/profile/0"
        className="flex flex-col items-center text-xl text-gray-100"
      >
        <FaUser className="text-xl" />
        Account
      </Link>
    </nav>
  );
};

export default MobileBottomNav;
