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
          {statsData.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full md:w-1/3 text-center"
            >
              <h2 className="text-6xl text-white border-b my-2">
                {item.value}
              </h2>
              <h3 className="text-2xl font-bold text-gray-200 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-200">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutStatsSection;
