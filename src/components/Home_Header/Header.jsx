import React from "react";

const Header = () => {
  return (
    <div className="header_content shadow-sm">
      <div className="item-1 p-4  ">
        <h2 className="text-[1.6rem] py-2 px-4 rounded-md">Automobiles</h2>
        <ul className="flex flex-col text-2xl text-gray-500 gap-y-7 p-4">
          <li>Clothes and wear</li>
          <li>Home interiors</li>
          <li>Computer and tech</li>
          <li>Tools, equipments</li>
          <li>Sports and outdoor</li>
          <li>Animal and pets</li>
          <li>Machinery Tools</li>
          <li>More Category</li>
        </ul>
      </div>
      <div className="item-2 md:p-20">
        <h3 className="md:text-4xl font-sans">Latest trending</h3>
        <h1 className="md:text-5xl text-gray-600 mt-2">Electronics items</h1>
        <button className="text-gray-500 text-3xl px-4 py-3 bg-white my-4 rounded-lg hover:text-gray-600 hover:bg-gray-50 transition-all duration-75">
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
                src="/src/assets/icons/headerUser.png"
                alt=""
              />
            </p>
            <span className="text-2xl">
              Hi, user <br /> Let's get stated
            </span>
          </div>
          <button className=" w-[90%] text-xl text-white  mx-4 py-3 rounded-lg bg-blue-500">
            Join now
          </button>
          <button className=" w-[90%] text-xl bg-white  mx-4 py-3 rounded-lg text-blue-500">
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

export default Header;
