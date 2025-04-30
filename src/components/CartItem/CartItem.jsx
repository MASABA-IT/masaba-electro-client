import { useEffect, useRef, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useProductStore } from "../../providers/AppProviders";
import { IoTrash } from "react-icons/io5";

export default function CartItem({
  item,
  removeItem,
  saveForLater,
  updateItemQuantity,
}) {
  const { BASE_URL, cartItems } = useProductStore();
  const [selectedQty, setSelectedQty] = useState(item.quantity || 1);

  useEffect(() => {
    // Update localStorage whenever selectedQty changes
    const updatedCart = JSON.parse(localStorage.getItem("cartData")) || [];
    const updatedItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (updatedItemIndex > -1) {
      // Update the quantity in the cart
      updatedCart[updatedItemIndex].quantity = selectedQty;
      updatedCart[updatedItemIndex].subtotal = (
        updatedCart[updatedItemIndex].price * selectedQty
      ).toFixed(2);
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
    }
  }, [selectedQty, item.id, item.price]);

  const handleQuantityChange = (newQty) => {
    if (newQty >= 1) {
      setSelectedQty(newQty);
      updateItemQuantity(item.id, newQty);
    }
  };
  const isQtyAllowed = (id, stockLimit) => {
    const foundItem = cartItems.find((item) => item.id === id);

    if (!foundItem) return false; // item not found in cart

    return foundItem.quantity < stockLimit;
  };
  console.log("-------check");
  console.log(item.id, item.stocks?.[0]?.quantity, "---------qty");
  console.log(isQtyAllowed(item.id, item.stocks?.[0]?.quantity));
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-4 border-b-2 m-4 pb-6 bg-gray-50">
      {/* Left */}
      <div className="flex gap-4">
        <img
          src={`${BASE_URL}/${item.image}`}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-2xl xl:text-2xl font-semibold text-gray-600">
            {item.title}
          </h2>
          <p className="text-2xl font-bold text-zinc-500">
            Price: ৳{item.price * selectedQty}
          </p>
          <div className="mt-4 space-x-4 text-xl xl:text-2xl flex">
            {/* Remove Item Button */}
            <button
              className="text-red-500 border rounded-lg px-2 xl:px-4 py-2 hover:bg-red-50 duration-75"
              onClick={() => removeItem(item.id)}
            >
              <IoTrash />
            </button>
            {/* Save for Later Button */}
            {/* <button
              className="text-blue-500 border rounded-lg px-2 xl:px-4 py-2 hover:bg-blue-100 duration-75"
              onClick={() => saveForLater(item.id)}
            >
              Save for later
            </button> */}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="text-right flex items-center justify-between w-full md:w-auto flex-row-reverse md:flex-col">
        {/* Quantity Selector */}
        <div className="mt-4 flex items-center gap-2 text-2xl">
          <button
            onClick={() => handleQuantityChange(selectedQty - 1)}
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
                handleQuantityChange(value);
              }
            }}
            className="w-16 text-center border rounded-lg py-2 px-1 bg-white outline-none"
          />

          <button
            onClick={() => handleQuantityChange(selectedQty + 1)}
            className="w-10 h-10 text-xl rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
}
