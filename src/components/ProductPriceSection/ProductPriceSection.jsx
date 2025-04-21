import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";

const ProductPriceSection = ({
  price = 0,
  isSaved = false,
  onSaveToggle,
  onAddToCart,
  stock = 0,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = (quantity * parseFloat(price)).toFixed(2);

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
              className="bg-gray-100 text-3xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              -
            </button>
            <span className="text-2xl font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= stock}
              className={`text-3xl w-8 h-8 rounded-full flex items-center justify-center ${
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
          onClick={() => onAddToCart(quantity)}
          disabled={stock === 0}
          className={`text-xl font-semibold rounded-lg py-3 transition duration-150 ${
            stock === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {/* Save for Later */}
      <button
        onClick={onSaveToggle}
        className="flex justify-center items-center w-full mt-6 py-3 text-2xl gap-3 border rounded-lg hover:shadow-md transition duration-150"
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
