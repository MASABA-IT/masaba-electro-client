import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AddressCardList = ({
  addresses = [],
  selectedAddress,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
      {addresses?.map((addr, i) => (
        <div
          key={addr?.user_id + i}
          className={`relative border rounded-md p-4 transition-all duration-200 flex flex-col sm:flex-row gap-4 cursor-pointer ${
            selectedAddress === addr.id
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() => onSelect(addr.id)}
        >
          {/* Radio Button */}
          <input
            type="radio"
            name="address"
            value={addr.id}
            checked={selectedAddress === addr.id}
            onChange={() => onSelect(addr.id)}
            className="absolute top-4 left-4 accent-blue-600 w-4 h-4"
          />

          {/* Address Details */}
          <div className="ml-6 flex-1 text-gray-800">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              📦 Shipping Info
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-xl">
              <li>
                <strong>👤 Name:</strong> {addr.username}
              </li>
              <li>
                <strong>📞 Phone:</strong> {addr.phone_number}
              </li>
              <li>
                <strong>🏠 Street:</strong> {addr.address}
              </li>
              <li>
                <strong>🏘️ Union:</strong> {addr.union_name}
              </li>
              <li>
                <strong>🏙️ Thana:</strong> {addr.thana_name}
              </li>
              <li>
                <strong>🏡 District:</strong> {addr.district_name}
              </li>
              <li>
                <strong>🗺️ Division:</strong> {addr.division_name}
              </li>
              <li>
                <strong>📮 Postal:</strong> {addr.postal_code}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-6 flex gap-x-4 space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(addr);
              }}
              title="Edit Address"
              className="text-yellow-600 hover:text-yellow-600 transition-transform hover:scale-110 text-2xl"
            >
              <FaEdit />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e, addr);
              }}
              title="Delete Address"
              className="text-red-500 hover:text-red-600 transition-transform hover:scale-110"
            >
              <MdDelete size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressCardList;
