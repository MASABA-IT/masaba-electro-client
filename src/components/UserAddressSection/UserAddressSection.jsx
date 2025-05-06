import React from "react";
import { MdDelete } from "react-icons/md";

const UserAddressSection = ({
  addresses = [],
  selectedAddress,
  setSelectedAddress,
  onAddNew,
  onDeleteAddress,
}) => {
  const formatAddress = (addr) => {
    if (!addr) return "No address available";

    const {
      username,
      phone_number,
      address,
      union_name,
      thana_name,
      district_name,
      division_name,
      postal_code,
    } = addr;

    const parts = [
      username,
      phone_number,
      address,
      union_name,
      thana_name,
      district_name,
      division_name,
    ].filter(Boolean); // skip empty/null values

    return `${parts.join(", ")}${postal_code ? ` - ${postal_code}` : ""}`;
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      {/* Title and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Your Address</h3>
        <button
          onClick={onAddNew}
          className="text-blue-600 underline text-xl md:text-2xl"
        >
          + Add New Address
        </button>
      </div>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <p className="text-gray-600">You have no saved addresses.</p>
      ) : (
        <div className=" flex flex-col gap-y-2">
          {addresses.map((addr) => (
            <label
              key={addr.id}
              className={`border p-4 rounded-md cursor-pointer shadow-sm flex items-start gap-3 transition relative ${
                selectedAddress === addr.id
                  ? "border-green-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="address"
                value={addr.id}
                checked={selectedAddress === addr.id}
                onChange={() => setSelectedAddress(addr.id)}
                className="mt-1 accent-green-600"
              />
              <div className="text-gray-800 text-base leading-relaxed space-y-1">
                <p>
                  <span className="font-semibold">Name:</span> {addr.username}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {addr.phone_number}
                </p>
                <p>
                  <span className="font-semibold">Street:</span> {addr.address}
                </p>
                <p>
                  <span className="font-semibold">Union:</span>{" "}
                  {addr.union_name}
                </p>
                <p>
                  <span className="font-semibold">Thana:</span>{" "}
                  {addr.thana_name}
                </p>
                <p>
                  <span className="font-semibold">District:</span>{" "}
                  {addr.district_name}
                </p>
                <p>
                  <span className="font-semibold">Division:</span>{" "}
                  {addr.division_name}
                </p>
                <p>
                  <span className="font-semibold">Postal Code:</span>{" "}
                  {addr.postal_code}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // prevent radio selection
                  onDeleteAddress(addr.id); // call parent handler
                }}
                className="absolute right-4 top-1/3 text-3xl text-red-400 hover:scale-125 transition-transform duration-200"
              >
                <MdDelete />
              </button>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAddressSection;
