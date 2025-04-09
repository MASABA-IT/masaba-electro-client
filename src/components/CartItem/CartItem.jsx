import { useEffect, useRef, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";

export default function CartItem({
  item,
  removeItem,
  saveForLater,
  updateItemQuantity,
}) {
  const [selectedQty, setSelectedQty] = useState(item.quantity || 1);
  const [showList, setShowList] = useState(false);
  const dropdownRef = useRef(null);
  // const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if click happens outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const toggleDropdown = () => {
  //   setShowList(!showList);
  // };

  // const handleQtySelect = (qty) => {
  //   setSelectedQty(qty);
  //   updateItemQuantity(item.id, qty); // Update quantity in parent
  //   setShowList(false); // Close the dropdown after selection
  // };

  return (
    <div className="flex flex-col  md:flex-row justify-between items-start gap-6 p-4 border-b-2 m-4 pb-6 bg-gray-50">
      {/* Left */}
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-2xl xl:text-2xl font-semibold text-gray-600">
            {item.title}
          </h2>
          <p className="text-xl xl:text-2xl text-gray-400">
            Size: {item.size}, Color: {item.color}, Material: {item.material}
          </p>
          <p className="text-xl xl:text-2xl text-gray-400">
            Seller: {item.seller}
          </p>

          <div className="mt-4 space-x-4 text-xl xl:text-2xl flex  ">
            {/* Remove Item Button */}
            <button
              className="  text-red-500 border rounded-lg px-2  xl:px-4 py-2 hover:bg-red-100 duration-75"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
            {/* Save for Later Button */}
            <button
              className="text-blue-500 border rounded-lg px-2 xl:px-4 py-2 hover:bg-blue-100 duration-75"
              onClick={() => saveForLater(item.id)}
            >
              Save for later
            </button>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="text-right flex items-center justify-between   w-full md:w-auto flex-row-reverse md:flex-col">
        <p className="text-2xl font-bold text-gray-900">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity Selector */}
        <div className="mt-4 flex items-center gap-2 text-2xl">
          <button
            onClick={() => setSelectedQty((prev) => Math.max(1, prev - 1))}
            className="w-10 h-10 text-xl rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <FaMinus />
          </button>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={selectedQty}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 1) {
                setSelectedQty(value);
              }
            }}
            className="w-16 text-center border rounded-lg py-2 px-1 bg-white outline-none"
          />

          <button
            onClick={() => setSelectedQty((prev) => prev + 1)}
            className="w-10 h-10 text-xl rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

/* <div className="mt-4 relative text-2xl" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="w-[120px] border px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex justify-between items-center gap-2"
          >
            Qty: {selectedQty}
            <IoChevronDownOutline
              className={`transform transition-transform duration-200 ${
                showList ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {showList && (
            <ul className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg w-24 z-10">
              {quantities.map((qty) => (
                <li
                  key={qty}
                  className={`px-4 py-2 cursor-pointer ${
                    selectedQty === qty ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => handleQtySelect(qty)} // Use handleQtySelect for selection
                >
                  {qty}
                </li>
              ))}
            </ul>
          )}
        </div> */
