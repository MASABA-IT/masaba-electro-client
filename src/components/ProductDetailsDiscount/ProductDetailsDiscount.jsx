import React from "react";

const ProductDetailsDiscount = () => {
  return (
    <div className="relative my-10 h-auto xl:h-44 py-4 overflow-hidden rounded-lg bg-blue-400 ">
      {/* Right Half */}
      <div className="absolute -right-[50px] md:-right-[500px] -top-[150px] xl:top-0  w-[80%] rotate-[25deg] xl:rotate-[55deg] h-[500px] bg-blue-600 z-0" />

      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row justify-center gap-y-4 md:justify-between items-center h-full px-10 text-white">
        <div>
          <h1
            className="text-2xl xl:text-4xl font-bold mb-2 text-white"
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
        <button className="bg-green-50 text-xl xl:text-2xl text-zinc-600  font-semibold px-6 py-2 rounded-full hover:bg-green-500 hover:text-white transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsDiscount;
