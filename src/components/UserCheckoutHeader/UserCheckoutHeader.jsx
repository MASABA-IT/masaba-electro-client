import React from "react";
import { Link } from "react-router-dom";
import checkout from "../../assets/imgs/userShopping.png"; // Adjust the path as needed

const UserCheckoutHeader = () => {
  return (
    <div className="w-full guestCheckout_header bg-gradient-to-br from-blue-600 to-gray-500 text-white shadow-md min-h-[200px] flex justify-center items-center relative overflow-hidden">
      {/* Left Side - Image (object-contain) */}
      <div className="absolute top-[58%] md:top-1/2  left-[30%]  md:left-[20%] xl:left-1/4 transform -translate-x-[60%] -translate-y-1/2 h-full p-4">
        <img
          src={checkout}
          alt="Checkout"
          className="w-[50%] h-[70%] md:w-[70%] md:h-[90%] xl:w-[70%] xl:h-[90%] object-contain"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="w-1/2 md:w-2/3 xl:w-2/3  flex flex-col justify-center items-center text-center px-4 gap-y-4">
        <h1
          className="text-xl md:text-3xl xl:text-5xl font-bold"
          style={{ textShadow: "0 2px 4px #777" }}
        >
          You're One Step Away from Awesome Stuff!
        </h1>
        <h3 className="text-lg md:text-2xl font-semibold">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>{" "}
          &gt; <span className="text-yellow-300">Shop Checkout</span>
        </h3>
      </div>
    </div>
  );
};

export default UserCheckoutHeader;
