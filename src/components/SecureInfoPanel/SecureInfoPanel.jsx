import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { TbLockFilled } from "react-icons/tb";

const SecureInfoPanel = () => {
  return (
    <div className="secureInfoPanel ">
      <div className="flex   items-center gap-x-4 px-6">
        <TbLockFilled className="icon text-3xl bg-gray-200 w-[5rem] h-[5rem] p-4 rounded-full text-gray-500" />
        <div>
          <p className="font-bold">Secure payment</p>
          <p className="text-2xl">Have you ever finally just</p>
        </div>
      </div>
      <div className="flex items-center gap-x-4 px-6">
        <BiMessageDetail className="icon text-3xl bg-gray-200 w-[5rem] h-[5rem] p-4 rounded-full text-gray-500" />

        <div>
          <p className="font-bold">Customer support</p>
          <p className="text-2xl">Have you ever finally just</p>
        </div>
      </div>
      <div className="flex items-center gap-x-4 px-6">
        <FaCarSide className="icon text-3xl bg-gray-200 w-[5rem] h-[5rem] p-4 rounded-full text-gray-500" />

        <div>
          <p className="font-bold">Free delivery</p>
          <p className="text-2xl">Have you ever finally just</p>
        </div>
      </div>
    </div>
  );
};

export default SecureInfoPanel;
