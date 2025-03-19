import React, { useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion

const Hero = () => {
  const categories = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery Tools",
    "More Category",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="hero_content shadow-sm">
      {/* Category list with animation */}
      <motion.div
        className="item-1 p-4"
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // Animate to original position
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ul className="flex flex-col text-sm md:text-2xl text-gray-500 gap-y-2 p-4 overflow-y-auto">
          {categories.map((category, index) => (
            <motion.li
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`item-1 ${
                activeIndex === index ? "active" : ""
              } transition-all duration-300 ease-in-out`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }} // Delay for each list item
            >
              {category}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Main section with animation */}
      <motion.div
        className="item-2 p-10 md:p-20"
        initial={{ opacity: 0, y: 50 }} // Start off slightly below
        animate={{ opacity: 1, y: 0 }} // Animate to original position
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="text-2xl md:text-4xl font-sans font-normal">
          Latest trending
        </h3>
        <h1 className="text-4xl md:text-6xl text-gray-800 font-normal mt-2">
          Electronics items
        </h1>
        <button className="text-blue-500 text-3xl md:text-gray-500  px-4 py-3 bg-white my-4 rounded-lg hover:text-gray-600 hover:bg-gray-50 transition-all duration-75 shadow-md hover:shadow-sm hover:cursor-pointer ">
          Learn More
        </button>
      </motion.div>

      {/* Additional section with animation */}
      <motion.div
        className="item-3 flex flex-col columns-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 1 */}
        <div className="flex flex-col items-center gap-y-4 col-span-1 p-5">
          <div className="item-3-user flex justify-center items-center gap-4">
            <p className="h-12 aspect-square rounded-full bg-slate-400 flex justify-center items-center">
              <img
                className="w-6 aspect-square"
                src="/src/assets/icons/heroUser.png"
                alt=""
              />
            </p>
            <span className="text-2xl">
              Hi, user <br /> Let's get started
            </span>
          </div>
          <button className=" w-[90%] text-xl hover:bg-[#3b83f6e1] transition-colors duration-75 text-white  mx-4 py-3 rounded-lg bg-blue-500">
            Join now
          </button>
          <button className=" w-[90%] text-xl hover:bg-gray-50 transition-colors duration-75 bg-white  mx-4 py-3 rounded-lg text-blue-500">
            Log in
          </button>
        </div>
        {/* 2 */}
        <motion.p
          className="flex-1 my-4 w-[90%] mx-auto text-white bg-orange-400 text-[1.4rem] flex justify-center items-center p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Get US $10 off with a new supplier
        </motion.p>
        {/* 3 */}
        <motion.p
          className="flex-1 mb-4 w-[90%] mx-auto text-white bg-[#55BDC3] text-[1.4rem] flex justify-center items-center p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Get US $10 off with a new supplier
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;
