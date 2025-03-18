import React, { useState } from "react";
import bgImg from "../../assets/imgs/emailBgimg.png";

const HomeEmail = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className={`home_email relative min-h-[20vh] md:min-h-[40vh] flex flex-col md:flex-row items-center justify-between rounded-lg shadow-md overflow-hidden px-14`}
    >
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2C7CF1]/80 to-[#00D1FF]/80"></div>

      {/* Left Side - Heading */}
      <div className="relative w-full md:w-1/3 text-left md:p-6 z-10 self-start mt-10">
        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
          An easy way to send requests to all suppliers
        </h2>
        <p className="hidden md:block md:text-lg text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <button
          type="button"
          onClick={toggleModal} // Toggle the modal on button click
          className="block md:hidden w-[120px] text-xl bg-blue-600 text-white py-3 rounded-lg font-semibold active:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Send inquiry
        </button>
      </div>

      {/* Right Side - Form (PC view) */}
      <div
        className={`hidden md:flex h-[75%] relative w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md z-10 flex-col gap-y-4`}
      >
        <h2 className="text-3xl font-semibold text-black">
          Send Quote to Suppliers
        </h2>
        <form className="flex flex-col gap-4">
          {/* Item Input */}
          <input
            type="text"
            placeholder="What item you need?"
            className="w-full text-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Details Input */}
          <textarea
            placeholder="Type more details"
            rows="3"
            className="w-full text-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* Quantity Input */}
          <div className="flex items-center gap-4">
            <input
              type="number"
              placeholder="Quantity"
              className="w-1/2 text-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="w-1/2 text-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>PCS</option>
              <option>BOX</option>
              <option>KG</option>
            </select>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-[120px] text-xl bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300"
          >
            Send inquiry
          </button>
        </form>
      </div>

      {/* Mobile Modal (form appears as a modal on mobile) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] md:w-[500px] relative">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Send Quote to Suppliers
            </h2>
            <form className="flex flex-col gap-4">
              {/* Item Input */}
              <input
                type="text"
                placeholder="What item you need?"
                className="w-full text-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Details Input */}
              <textarea
                placeholder="Type more details"
                rows="3"
                className="w-full text-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              {/* Quantity Input */}
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-1/2 text-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-1/2 text-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>PCS</option>
                  <option>BOX</option>
                  <option>KG</option>
                </select>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-[120px] text-xl bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300"
              >
                Send inquiry
              </button>
            </form>
            {/* Close Button (X) */}
            <button
              onClick={toggleModal} // Close the modal
              className="absolute top-2 right-4 text-5xl text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeEmail;
