import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { TbLockFilled } from "react-icons/tb";

const SecureInfoPanel = () => {
  return (
    <div className="secureInfoPanel ">
      <div className=" flex justify-center xl:justify-start items-center   gap-x-4 px-6">
        <TbLockFilled className="icon text-xl md:text-3xl bg-gray-200 w-[4rem] xl:w-[4rem] h-[4rem] xl:h-[4rem] p-3 rounded-full text-gray-500" />
        <div>
          <p className="font-bold text-2xl">Secure payment</p>
          <p className="text-xl ">Have you ever finally just</p>
        </div>
      </div>
      <div className="flex  justify-center xl:justify-start items-center gap-x-4 px-6">
        <BiMessageDetail className="icon text-xl md:text-3xl bg-gray-200 w-[4rem] xl:w-[4rem] h-[4rem] xl:h-[4rem] p-3 rounded-full text-gray-500" />

        <div>
          <p className="font-bold text-2xl">Customer support</p>
          <p className="text-xl ">Have you ever finally just</p>
        </div>
      </div>
      <div className="flex justify-center xl:justify-start items-center gap-x-4 px-6">
        <FaCarSide className="icon text-xl md:text-3xl bg-gray-200 w-[4rem] xl:w-[4rem] h-[4rem] xl:h-[4rem] p-3 rounded-full text-gray-500" />

        <div>
          <p className="font-bold text-2xl">Free delivery</p>
          <p className="text-xl ">Have you ever finally just</p>
        </div>
      </div>
    </div>
  );
};

export default SecureInfoPanel;
