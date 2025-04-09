import React from "react";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

const cardsData = [
  {
    id: 1,
    image: "/src/assets/imgs/mobile1.png",
    title: "GoPro HERO6 4K Action",
    subTitle: " Camera - Black",
    price: 299.99,
  },
  {
    id: 2,
    image: "/src/assets/imgs/mobile2.png",
    title: "Sony WH-1000XM5",
    subTitle: "Wireless Headphones",
    price: 399.0,
  },
  {
    id: 3,
    image: "/src/assets/imgs/watch.png",
    title: "Fitbit Inspire 3",
    subTitle: "Fitness Tracker",
    price: 89.5,
  },
  {
    id: 4,
    image: "/src/assets/imgs/laptop.png",
    title: "JBL Flip 6 ",
    subTitle: "Portable Speaker",
    price: 129.95,
  },
];

const CartLetterSave = () => {
  return (
    <div className="cartLetterSave   bg-white border-2 rounded-xl">
      <h2 className="text-2xl xl:text-3xl p-3 xl:p-6 font-bold">
        Saved for later
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="p-3 xl:p-6  rounded-xl      flex flex-col   hover:shadow-md transition"
          >
            <div className="w-full bg-[#eeeeee] h-[240px] flex justify-center items-center overflow-hidden rounded-lg mb-4">
              <img
                src={card.image}
                alt={card.title}
                className="w-[60%] h-full "
              />
            </div>
            <p className="text-2xl xl:text-3xl font-bold text-[#ad7d3e] mb-1">
              ${card.price.toFixed(2)}
            </p>
            <h2 className="text-xl xl:text-2xl font-medium text-gray-500 mb-3">
              {card.title}
            </h2>
            <p className="text-xl xl:text-2xl font-medium text-gray-500 mb-3">
              {card.subTitle}
            </p>
            <div className="btn_group flex justify-between text-lg xl:text-2xl">
              <button className="text-blue-500 font-semibold border-2  px-4 py-2 rounded-lg hover:bg-gray-200 transition flex justify-center items-center  gap-x-4">
                <MdOutlineShoppingCart className="text-3xl " />
                Move to cart
              </button>
              <button className="text-red-400 font-semibold border-2  px-4 py-2 rounded-lg hover:bg-gray-200 transition flex justify-center items-center  gap-x-4">
                <IoMdRemoveCircle className="text-3xl " />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartLetterSave;
