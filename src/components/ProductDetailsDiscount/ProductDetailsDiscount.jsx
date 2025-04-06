import React from "react";

const ProductDetailsDiscount = () => {
  return (
    <div className="relative my-10 h-44 overflow-hidden rounded-lg ">
      {/* Left Half */}
      <div className="absolute left-0 top-0 w-full h-full bg-blue-400 z-0" />

      {/* Right Half */}
      <div className="absolute -right-[500px] top-0  w-[80%] rotate-[55deg] h-[500px] bg-blue-600 z-0" />

      {/* Content */}
      <div className="relative z-20 flex justify-between items-center h-full px-10 text-white">
        <div>
          <h1
            className="text-4xl font-bold mb-2 text-white"
            style={{
              textShadow: "2px 2px 6px rgba(0, 120, 255, 0.7)",
            }}
          >
            Super discount on more than 100 USD
          </h1>

          <p className="text-xl text-white">
            Get the best deals on your favorite gadgets today!
          </p>
        </div>
        <button className="bg-orange-400 text-2xl text-zinc-50  font-semibold px-6 py-2 rounded-full hover:bg-orange-500 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsDiscount;
