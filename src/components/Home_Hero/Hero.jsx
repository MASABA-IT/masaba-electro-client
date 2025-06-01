import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate } from "react-router-dom";
import { FaFaceSmile } from "react-icons/fa6";
import userImg from "../../assets/icons/heroUser.png";
const Hero = ({ onScrollToCollections }) => {
  const {
    categories,
    fetchSearchProducts,
    searchCategories,
    userData,
    BASE_URL,
    setSelectedCategories,
  } = useProductStore();

  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  //-------------------------------------------------------------

  const userProfile = userData?.profile?.data;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userProfile && userProfile.name) {
      // Simulate loading animation for a better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 1500); // You can adjust timing
    }
  }, [userProfile]);
  return (
    <div className="hero_content shadow-sm ">
      {/* left side */}
      <motion.div
        className="item-1 p-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ul className="flex flex-col text-sm md:text-2xl text-gray-500 gap-y-2 overflow-y-auto">
          {!categories || categories.length === 0
            ? // ৯টা skeleton item loading placeholder
              Array.from({ length: 9 }).map((_, index) => (
                <li
                  key={index}
                  className="w-3/4 h-full my-3 mx-auto md:h-7  bg-gray-300 rounded animate-pulse px-4"
                ></li>
              ))
            : categories.map((category, index) => (
                <motion.li
                  key={category.id}
                  onClick={() => {
                    setActiveIndex(index);
                    navigate(`/categories/${category.id}`);
                    setSelectedCategories({
                      id: category.id,
                      title: category.title,
                    });
                  }}
                  role="button"
                  className={`item-1 cursor-pointer hover:text-blue-400 duration-75 ${
                    activeIndex === index ? "active" : ""
                  } transition-all duration-300 ease-in-out`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  {category.title}
                </motion.li>
              ))}
        </ul>
      </motion.div>

      {/* Main section with animation */}
      <motion.div
        className="item-2 p-10 md:p-20 "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="text-2xl md:text-4xl font-sans font-normal text-gray-600">
          Latest trending
        </h3>
        <h1
          className=" text-3xl md:text-6xl text-zinc-700 font-normal mt-2"
          style={{
            textShadow: "0 2px 4px #f4f3f2",
            fontFamily: "cursive",
          }}
        >
          Electronics items
        </h1>
        <button
          onClick={onScrollToCollections}
          className="text-blue-500 text-2xl sm:text-3xl md:text-gray-500  px-4 py-3 bg-white my-4 rounded-lg hover:text-gray-600 hover:bg-gray-50 transition-all duration-75 shadow-md hover:shadow-sm hover:cursor-pointer "
        >
          Learn More
        </button>
      </motion.div>
      {/* right side */}
      <motion.div
        className="item-3 flex flex-col columns-6  "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 1 */}
        <div className="child-1 flex flex-col items-center gap-y-4 col-span-1 p-5 m-4">
          <div className="item-3-user flex justify-center items-center gap-4">
            <p className="h-12 aspect-square rounded-full bg-slate-400 flex justify-center items-center overflow-hidden">
              {userProfile && userProfile.image ? (
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={`${BASE_URL}/${userProfile.image}`}
                  alt="User"
                />
              ) : (
                <img
                  className="w-6 aspect-square"
                  src={userImg}
                  alt="Default user"
                />
              )}
            </p>
            <span className="text-2xl w-auto">
              {userProfile && userProfile.name ? (
                <>
                  Hi, {userProfile.name.split(" ")[0]} 👋 <br />
                  <span className="text-xl text-gray-500">
                    {userProfile.email || userProfile.phone_number}
                  </span>
                </>
              ) : (
                <>
                  Hi, user <br /> Let&apos;s get started
                </>
              )}
            </span>
          </div>

          {!userProfile || !userProfile.name ? (
            <>
              <button
                onClick={() => navigate("/signup")}
                className=" w-[90%] text-xl hover:bg-[#3b83f6e1] transition-colors duration-75 text-white mx-4 py-3 rounded-lg bg-blue-500"
              >
                Join now
              </button>
              <button
                onClick={() => navigate("/login")}
                className=" w-[90%] text-xl hover:bg-gray-50 transition-colors duration-75 bg-white mx-4 py-3 rounded-lg text-blue-500"
              >
                Log in
              </button>
            </>
          ) : null}
        </div>

        {/* 2 */}
        <motion.div
          className="child-2 flex-1 md:mt-4 md:mr-4 xl:m-4 xl:mt-0 xl:mb-4 w-[90%] mx-auto text-white bg-orange-400 text-[1.4rem] flex justify-center items-center p-4 rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          "Discover Deals, Delivered Daily."
        </motion.div>
        {/* 3 */}
        <motion.p
          className="child-3 flex-1 md:mt-4 md:mr-4 xl:m-4 xl:mt-0 xl:mb-4 w-[90%] mx-auto text-white bg-[#55BDC3] text-[1.4rem] flex justify-center items-center p-4 rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          "Where Quality Meets Affordability."
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;
