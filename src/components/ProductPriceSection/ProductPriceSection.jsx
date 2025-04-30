import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useProductStore } from "../../providers/AppProviders";

const ProductPriceSection = ({
  price,
  isSaved = false,
  onSaveToggle,
  onAddToCart,
  stock,
  id,
  newProduct,
  setNewProduct,
  resetTrigger,
}) => {
  const { cartItems } = useProductStore();
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = (quantity * parseFloat(price)).toFixed(2);
  useEffect(() => {
    if (setNewProduct && newProduct) {
      setNewProduct({
        ...newProduct,
        quantity,
        subtotal: parseFloat(totalPrice),
      });
    }
  }, [quantity, totalPrice]);
  useEffect(() => {
    setQuantity(1);
    if (setNewProduct && newProduct) {
      setNewProduct({
        ...newProduct,
        quantity: 1,
        subtotal: parseFloat(price),
      });
    }
  }, [resetTrigger]);
  const handleAddToCartClick = () => {
    onAddToCart(quantity); // Call your function
    setClicked(true); // Show feedback
    setTimeout(() => setClicked(false), 1000); // Reset after 1 second
  };
  // const isQtyAllowed = (id, stockLimit) => {
  //   console.log(cartItems);
  //   console.log("id", id, "stockLimit", stockLimit);
  //   console.log("quantity", quantity);
  //   const foundItem = cartItems.find((item) => item.id === parseInt(id));
  //   console.log(foundItem.quantity, "founditem");

  //   if (!foundItem) return false;

  //   return foundItem?.quantity < stockLimit;
  // };
  const foundItem = cartItems.find((item) => item.id === parseInt(id));
  const isQtyAllowed = (id, stockLimit) => {
    // If no item is found in cart, allow (true)
    if (!foundItem) return true;
    console.log("quantity", quantity);
    // Total quantity if user tries to increase
    const totalDesiredQty = foundItem.quantity + quantity;
    console.log(totalDesiredQty, "");
    // Allow only if total desired quantity is less than stock
    return totalDesiredQty < stockLimit;
  };
  console.log(foundItem, "FoundItem");
  console.log("-check ---", isQtyAllowed(id, stock));
  return (
    <div className="product_supplier w-full">
      <div className="flex flex-col border-2 rounded-2xl shadow-sm overflow-hidden px-5 py-6 gap-4">
        {/* Price Display */}
        <div className="flex justify-between text-2xl font-medium text-gray-700">
          <span>Price per item:</span>
          <span>৳ {parseFloat(price).toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-2xl font-semibold text-blue-600">
          <span>Total:</span>
          <span>৳ {totalPrice}</span>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center justify-between border rounded-lg px-4 py-3 mt-2">
          <span className="text-gray-600 text-2xl font-medium">Quantity:</span>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDecrease}
              className="bg-gray-100 text-3xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 outline-none"
            >
              -
            </button>
            <span className="text-2xl font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              disabled={
                quantity >= stock || foundItem?.quantity + quantity + 1 > stock
              }
              className={`text-3xl w-8 h-8 rounded-full flex items-center justify-center outline-none ${
                quantity >= stock
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              +
            </button>
          </div>
        </div>

        {/* Stock Info */}
        <div className="text-gray-500 text-xl text-right pr-1">
          In stock: {stock}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCartClick}
          onMouseDown={() => {
            const foundItem = cartItems.find(
              (item) => item.id === parseInt(id)
            );
            if (
              stock === 0 ||
              (foundItem && foundItem.quantity + quantity > stock)
            ) {
              setShowLimitWarning(true);
              setTimeout(() => setShowLimitWarning(false), 2000); // Hide after 2s
            }
          }}
          disabled={(() => {
            const foundItem = cartItems.find(
              (item) => item.id === parseInt(id)
            );
            return (
              stock === 0 ||
              (foundItem && foundItem.quantity + quantity > stock)
            );
          })()}
          className={`text-xl font-semibold rounded-lg py-3 transition duration-150 transform ${
            stock === 0 ||
            cartItems.find((item) => item.id === parseInt(id))?.quantity +
              quantity >
              stock
              ? "bg-gray-400 text-white cursor-not-allowed"
              : clicked
              ? "bg-green-600 text-white scale-95"
              : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
          }`}
        >
          {stock === 0
            ? "Out of Stock"
            : clicked
            ? "Added Successfully!"
            : "Add to Cart"}
        </button>

        {/* <button
          onClick={handleAddToCartClick}
          disabled={stock === 0 || foundItem?.quantity + quantity > stock}
          className={`text-xl font-semibold rounded-lg py-3 transition duration-150 transform ${
            stock === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : clicked
              ? "bg-green-600 text-white scale-95"
              : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
          }`}
        >
          {stock === 0
            ? "Out of Stock"
            : clicked
            ? "Added to Successfull!"
            : "Add to Cart"}
        </button> */}
      </div>

      {/* Save for Later */}
      <button
        onClick={onSaveToggle}
        className="flex justify-center items-center w-full mt-6 py-3 text-2xl gap-3 border rounded-lg hover:shadow-md transition duration-150  outline-none"
      >
        <CiHeart
          className={`text-4xl ${isSaved ? "text-red-500" : "text-blue-500"}`}
        />
        <span className="font-medium">
          {isSaved ? "Saved" : "Save for Later"}
        </span>
      </button>
    </div>
  );
};

export default ProductPriceSection;
