import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoPaperAirplane } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineInventory2 } from "react-icons/md";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { motion } from "framer-motion";
import service1 from "../../assets/imgs/service1.png";
import service2 from "../../assets/imgs/service2.png";
import service3 from "../../assets/imgs/service3.png";
import service4 from "../../assets/imgs/service4.png";

const services = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Source from Industry Hubs.",
    image: service1,
    icon: <IoIosSearch />,
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "Customize Your Products",
    image: service2,
    icon: <MdOutlineInventory2 />,
  },
  {
    id: 3,
    title: "Secure Payment",
    description: "Fast, reliable shipping by ocean or air",
    image: service3,
    icon: <GoPaperAirplane />,
  },
  {
    id: 4,
    title: "Easy Returns",
    description: "Product monitoring and inspection",
    image: service4,
    icon: <PiShieldCheckeredFill />,
  },
];

const HomeExtraServices = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentCard, setCurrentCard] = useState(0); // Track the current card

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Next and Previous card handlers
  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % services.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="home_services w-full rounded-lg">
      <h2 className="mb-6 px-4 md:p-0">Our Extra Services</h2>

      {/* Mobile view - stacked with Framer Motion scroll animation */}
      <div className="min-h-[190px] md:hidden relative hidden">
        <motion.div
          className="absolute w-full flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform transition-all duration-300">
            <div className="h-[70%] bg-gray-600">
              <img
                src={services[currentCard].image}
                alt={services[currentCard].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[30%] p-4 flex justify-between items-center relative">
              <span
                className="w-16 h-16 absolute top-0 right-4 -translate-x-1/2 -translate-y-1/2 bg-[#8199cc] text-white p-2 rounded-full shadow-lg flex justify-center items-center text-3xl"
                style={{ textShadow: "2px 4px 4px rgba(0, 0, 0, 0.3)" }}
              >
                {services[currentCard].icon}
              </span>
              <div>
                <h3 className="text-xl font-semibold">
                  {services[currentCard].title}
                </h3>
                <p className="text-lg text-gray-600">
                  {services[currentCard].description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="absolute top-1/3 left-0 right-0 flex justify-between px-4">
          {/* Previous Button */}
          <button
            onClick={prevCard}
            className={`bg-blue-500 text-white p-2 rounded-full shadow-lg ${
              currentCard === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentCard === 0} // Disable if at first card
          >
            &lt;
          </button>

          {/* Next Button */}
          <button
            onClick={nextCard}
            className={`bg-blue-500 text-white p-2 rounded-full shadow-lg ${
              currentCard === services.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentCard === services.length - 1} // Disable if at last card
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Desktop / Laptop view - grid layout */}
      <div className="md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:block px-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform transition-all duration-300"
          >
            {/* Image (70% height) */}
            <div className="h-[70%] bg-gray-600">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info (30% height) */}
            <div className="h-[30%] p-4 flex justify-between items-center relative">
              <span
                className="w-16 h-16 absolute top-0 right-4 -translate-x-1/2 -translate-y-1/2 bg-[#8199cc] text-white p-2 rounded-full shadow-lg flex justify-center items-center text-3xl"
                style={{ textShadow: "2px 4px 4px rgba(0, 0, 0, 0.3)" }}
              >
                {service.icon}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-lg text-gray-600">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeExtraServices;
