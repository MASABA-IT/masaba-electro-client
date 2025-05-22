import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaThList,
  FaRegHeart,
  FaUser,
  FaListAlt,
} from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";

const MobileBottomNav = () => {
  const { showWishlist, userData } = useProductStore();
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

    getCartFromLocalStorage();

    const interval = setInterval(() => {
      getCartFromLocalStorage();
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t shadow-md flex justify-around items-center h-20 md:hidden">
      <Link
        to="/"
        className="flex flex-col items-center text-base text-gray-100"
      >
        <FaHome className="text-xl" />
        Home
      </Link>

      <Link
        to="/categories/1"
        //  onClick={() => setCategoryId(1)}
        className="group flex flex-col items-center  text-base text-white   transition font-medium "
      >
        <FaListAlt className=" " />
        All Categories
      </Link>
      <>
        {userData?.token ? (
          <Link
            to="/dashboard/orders/1"
            className="flex flex-col items-center text-base text-gray-100"
          >
            <FaThList className="text-xl" />
            Orders
          </Link>
        ) : (
          <Link
            to="/cart"
            className="flex flex-col items-center text-base text-gray-100 relative"
          >
            <FaThList className="text-xl" />

            <span>Carts</span>
            {cartCount > 0 && (
              <span
                className="absolute top-0 -right-1 text-white text-xs bg-red-500 rounded-full w-6 h-6 p-3 flex items-center justify-center"
                style={{ transform: "translate(50%, -50%)" }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        )}
      </>

      <Link
        to="/wishlist"
        className="flex flex-col items-center text-base text-gray-100 relative"
      >
        <FaRegHeart className="text-xl" />
        <span> Wishlist</span>
        {showWishlist.length > 0 && (
          <span
            className="absolute top-0 right-3 text-white text-xs bg-red-500 rounded-full w-6 h-6 p-3 flex items-center justify-center"
            style={{ transform: "translate(50%, -50%)" }}
          >
            {showWishlist.length}
          </span>
        )}
      </Link>
      <Link
        to="/dashboard/profile/0"
        className="flex flex-col items-center text-base text-gray-100"
      >
        <FaUser className="text-xl" />
        Account
      </Link>
    </nav>
  );
};

export default MobileBottomNav;
