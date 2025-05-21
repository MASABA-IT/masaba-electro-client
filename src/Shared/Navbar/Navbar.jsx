import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";

import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProductStore } from "../../providers/AppProviders";
import axios from "axios";
const Navbar = ({ showSidebar, setShowSidebar }) => {
  const { userData, handleLogout, logo, BASE_URL, showWishlist } =
    useProductStore();
  // Your cartItems state (you can replace this with actual data)
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(true);
  const [searchProducts, setSearchProducts] = useState("");
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
      navigate("/dashboard/profile/0");
      // handleLogout(navigate);
    } else {
      navigate("/login");
    }
  };

  const retrieveProducts = async (query) => {
    setNotFound(true);
    const trimmedSearch = query.trim();
    if (trimmedSearch === "") {
      setMatchedProducts([]);
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/product/search?title=${trimmedSearch}`
      );

      setMatchedProducts(data?.Products?.data || []);
      setNotFound(data.Products.data.length > 0 ? true : false);
    } catch (err) {
      setNotFound(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      retrieveProducts(searchProducts);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchProducts]);

  const handleCardInfo = (productId) => {
    navigate(`/categories/product/${productId}`);

    const targetPath = `/categories/product/${productId}`;

    if (location.pathname === targetPath) {
      // If already on the target path, reload the page
      window.location.reload();
    } else {
      // Navigate to the new path without reloading
      navigate(targetPath);
    }
  };

  const handleSearch = async () => {
    const trimmedSearch = searchProducts.trim();
    if (!trimmedSearch) {
      setMatchedProducts([]);

      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/product/search?title=${trimmedSearch}`
      );
      const products = data?.Products?.data || [];

      setMatchedProducts(products);

      if (products.length === 0) {
        setNotFound(true);
      } else {
        // Navigate to the first matched product's page
        navigate(`/categories/product/${products[0].id}`);

        const targetPath = `/categories/product/${products[0].id}`;

        if (location.pathname === targetPath) {
          window.location.reload();
        } else {
          navigate(targetPath);
        }
      }
    } catch (err) {
      console.error("Search failed:", err);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOrder = () => {
    navigate(`/dashboard/orders/1`);
  };
  const dropdownRef = useRef(null);
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setSearchProducts("");
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
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
          <div className="relative md:w-[40%] w-full">
            <div className="h-14 flex items-center border-[1px] border-blue-500 rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 focus-within:scale-105">
              <input
                type="text"
                value={searchProducts}
                onChange={(e) => setSearchProducts(e.target.value)}
                placeholder="Search products..."
                className="flex-1 h-full text-xl px-4 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="h-full px-6 font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              >
                Search
              </button>
            </div>

            {/* Search Results Dropdown */}
            {
              <div className="absolute top-full left-0 mt-2 w-full bg-white     rounded-lg shadow-xl z-50 overflow-hidden">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500 animate-pulse">
                    Searching...
                  </div>
                ) : (
                  <div ref={dropdownRef}>
                    {matchedProducts && notFound ? (
                      <ul className="max-h-80 overflow-y-auto custom-scrollbar divide-y divide-gray-100">
                        {matchedProducts.map((product) => (
                          <li
                            key={product.id}
                            onClick={() => handleCardInfo(product.id)}
                            className="flex items-center gap-4 p-3 hover:bg-blue-50 cursor-pointer transition"
                          >
                            <img
                              src={`${BASE_URL}/${product.thumbnail}`}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded border"
                            />
                            <div className="flex-1">
                              <p className="text-xl font-medium text-gray-800">
                                {product.title.length > 25
                                  ? `${product.title.substring(0, 20)}...`
                                  : product.title}
                              </p>

                              <div className="text-lg text-gray-600">
                                {product.discount_price ? (
                                  <>
                                    <span className="text-blue-600 font-bold">
                                      {product.discount_price} BDT
                                    </span>{" "}
                                    <span className="line-through   text-gray-400">
                                      {product.base_price} BDT
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-semibold">
                                    {product.base_price} BDT
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-gray-400">
                        No products found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            }
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
            <button
              className="flex flex-col items-center gap-y-3 group hover:text-purple-500"
              onClick={handleOrder}
            >
              <FaShoppingCart className="text-xl" />
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
              className="  flex justify-center items-center gap-2 text-3xl md:text-5xl font-black"
              style={{ textShadow: "1px 2px 4px #f9f9f9" }}
            >
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden "
              >
                <IoMdMenu />
              </button>
              <Link className="flex justify-center items-center" to="/">
                <img
                  src={`${BASE_URL}/${logo}`}
                  alt="Brand Logo"
                  className="brand-logo w-12 aspect-square"
                />
                <span className="text-stone-600">Masaba </span>
                <span className="text-orange-400"> Bazar </span>
              </Link>
            </div>
          </div>

          {/* icons */}
          <div className="nav-icons flex gap-x-6 justify-between items-center text-gray-500">
            <button
              className="flex flex-col  items-center gap-y-3"
              onClick={handleButtonClick}
            >
              <FaUser
                className={`text-2xl ${
                  userData?.token
                    ? "text-blue-400"
                    : "group-hover:text-blue-500"
                }`}
              />
            </button>
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
            </button>
          </div>
          {/* Input field */}
          <div className="relative   w-[95%] mx-auto">
            <div className="h-14 flex items-center border-[1px] border-blue-500 rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 focus-within:scale-105">
              <input
                type="text"
                value={searchProducts}
                onChange={(e) => setSearchProducts(e.target.value)}
                placeholder="Search products..."
                className="flex-1 h-full text-xl px-4 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="h-full px-6 font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              >
                Search
              </button>
            </div>

            {/* Search Results Dropdown */}
            {
              <div className="absolute top-full left-0 mt-2 w-full bg-white     rounded-lg shadow-xl z-50 overflow-hidden">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500 animate-pulse">
                    Searching...
                  </div>
                ) : (
                  <div>
                    {matchedProducts && notFound ? (
                      <ul className="max-h-80 overflow-y-auto custom-scrollbar divide-y divide-gray-100">
                        {matchedProducts.map((product) => (
                          <li
                            key={product.id}
                            onClick={() => handleCardInfo(product.id)}
                            className="flex items-center gap-4 p-3 hover:bg-blue-50 cursor-pointer transition"
                          >
                            <img
                              src={`${BASE_URL}/${product.thumbnail}`}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded border"
                            />
                            <div className="flex-1">
                              <p className="text-xl font-medium text-gray-800">
                                {product.title.length > 25
                                  ? `${product.title.substring(0, 20)}...`
                                  : product.title}
                              </p>

                              <div className="text-lg text-gray-600">
                                {product.discount_price ? (
                                  <>
                                    <span className="text-blue-600 font-bold">
                                      {product.discount_price} BDT
                                    </span>{" "}
                                    <span className="line-through   text-gray-400">
                                      {product.base_price} BDT
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-semibold">
                                    {product.base_price} BDT
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-gray-400">
                        No products found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
