import React, { useState } from "react";

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
      <div className="item-1 p-4  ">
        <ul className="flex flex-col text-2xl text-gray-500 gap-y-2 p-4 overflow-y-auto">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`item-1 ${
                activeIndex === index ? "active" : ""
              } transition-all duration-300 ease-in-out `}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="item-2 p-10 md:p-20">
        <h3 className="text-2xl md:text-4xl font-sans font-normal">
          Latest trending
        </h3>
        <h1 className="text-4xl md:text-6xl text-gray-800 font-normal mt-2">
          Electronics items
        </h1>
        <button className="text-blue-500 text-3xl md:text-gray-500  px-4 py-3 bg-white my-4 rounded-lg hover:text-gray-600 hover:bg-gray-50 transition-all duration-75 shadow-md hover:shadow-sm hover:cursor-pointer ">
          Learn More
        </button>
      </div>
      <div className="item-3 flex flex-col columns-6 ">
        {/* 1 */}
        <div className="flex flex-col items-center gap-y-4 col-span-1 p-5">
          <div className="item-3-user flex justify-center items-center gap-4 ">
            <p className="h-12 aspect-square rounded-full bg-slate-400 flex justify-center items-center">
              <img
                className="w-6 aspect-square"
                src="/src/assets/icons/heroUser.png"
                alt=""
              />
            </p>
            <span className="text-2xl">
              Hi, user <br /> Let's get stated
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
        <p className=" flex-1  my-4 w-[90%] mx-auto  text-white bg-orange-400 text-[1.4rem] flex justify-center items-center p-4 rounded-lg">
          Get US $10 off with a new supplier
        </p>
        {/* 3 */}
        <p className=" flex-1  mb-4 w-[90%] mx-auto  text-white bg-[#55BDC3] text-[1.4rem] flex justify-center items-center p-4 rounded-lg">
          Get US $10 off with a new supplier
        </p>
      </div>
    </div>
  );
};

export default Hero;
