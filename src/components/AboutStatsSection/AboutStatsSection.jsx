// components/AboutStatsSection.jsx
import React from "react";

const AboutStatsSection = ({ statsData, backgroundImage }) => {
  return (
    <div className=" w-full bg-gradient-to-br from-[#3f382a] via-[#302b63] to-[#44353e] py-16 flex items-center justify-center relative">
      {/* Background Blur Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-40"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 text-center">
        {/* Cards */}
        <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="bg-white/10 md:min-h-[270px] backdrop-blur-lg p-6 rounded-xl shadow-lg w-full md:w-1/3 text-center flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl sm:text-4xl p-2 text-orange-300 border-b my-2">
                Our Mission
              </h2>

              <p className="text-gray-200 text-xl sm:text-2xl">
                {statsData?.mission}
              </p>
            </div>
          </div>
          <div className="bg-white/10 md:min-h-[270px] backdrop-blur-lg p-6 rounded-xl shadow-lg w-full md:w-1/3 text-center flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl sm:text-4xl p-2 text-orange-300 border-b my-2">
                Our Drive and Vision
              </h2>

              <p className="text-gray-200 text-xl sm:text-2xl">
                {statsData?.vision}
              </p>
            </div>
          </div>
          <div className="bg-white/10 md:min-h-[270px] backdrop-blur-lg p-6 rounded-xl shadow-lg w-full md:w-1/3 text-center flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl sm:text-4xl p-2 text-orange-300 border-b my-2">
                The Goal
              </h2>

              <p className="text-gray-200 text-xl sm:text-2xl">
                {" "}
                {statsData?.others}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStatsSection;
