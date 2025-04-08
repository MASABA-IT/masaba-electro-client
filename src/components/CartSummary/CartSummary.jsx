import React from "react";
const CartSummary = ({
  couponCode,
  setCouponCode,
  applyCoupon,
  cartData,
  discount = 22.0,
  tax = 22.0,
  onCheckout,
  paymentOptions = [
    { id: 12, src: "/src/assets/imgs/payment1.png", alt: "Payment Option 1" },
    { id: 22, src: "/src/assets/imgs/payment2.png", alt: "Payment Option 2" },
    { id: 32, src: "/src/assets/imgs/payment3.png", alt: "Payment Option 3" },
    { id: 42, src: "/src/assets/imgs/payment4.png", alt: "Payment Option 4" },
    { id: 52, src: "/src/assets/imgs/payment5.png", alt: "Payment Option 5" },
  ],
}) => {
  const subtotal = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = (subtotal - discount + tax).toFixed(2);

  return (
    <div className="carts_totalAmount flex flex-col gap-y-4">
      {/* Coupon code */}
      <div className="coupon-section bg-white p-6 rounded-lg border">
        <h2 className="text-2xl font-bold py-2">Have a coupon code?</h2>
        <div className="flex items-center text-2xl ">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border p-3 w-full rounded-l-lg outline-none"
          />
          <button
            onClick={applyCoupon}
            className="text-blue-400 px-6 py-3 rounded-r-lg border duration-75"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="flex flex-col bg-white p-6">
        {/* Price Breakdown */}
        <div className="price-breakdown mb-6">
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <td className="text-xl font-semibold py-2">Subtotal</td>
                <td className="text-xl font-semibold py-2 text-right">
                  ${subtotal.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="text-xl font-semibold py-2 text-red-500">
                  Discount
                </td>
                <td className="text-xl font-semibold py-2 text-right text-red-500">
                  -${discount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="text-xl font-semibold py-2 text-gray-500">
                  Tax
                </td>
                <td className="text-xl font-semibold py-2 text-right text-gray-500">
                  +${tax.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="border-t border-gray-300 my-4" colSpan="2"></td>
              </tr>
              <tr>
                <td className="text-2xl font-semibold py-2">Total</td>
                <td className="text-3xl font-semibold py-2 text-right">
                  ${total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Checkout Button */}
        <div className="w-full checkout-section text-right">
          <button
            onClick={onCheckout}
            className="w-full bg-green-500 text-white text-2xl px-6 py-3 rounded-lg hover:bg-green-600 duration-75"
            style={{ textShadow: "0 2px 8px #333" }}
          >
            Checkout
          </button>
        </div>

        {/* Payment Methods */}
        <div className="payment-method-section bg-white p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Payment Options</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {paymentOptions.map((option, i) => (
              <div
                key={option.id + `${i}`}
                className="payment-option flex justify-center items-center"
              >
                <img
                  src={option.src}
                  alt={option.alt}
                  className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
