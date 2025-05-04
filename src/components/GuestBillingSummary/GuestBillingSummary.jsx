import React from "react";
import { useProductStore } from "../../providers/AppProviders";

const GuestBillingSummary = ({ handlePlaceOrder }) => {
  const billingSummary = JSON.parse(localStorage.getItem("billingSummary"));
  const { BASE_URL } = useProductStore();
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  const subtotal = billingSummary?.subtotal || 0;
  const discount = billingSummary?.discountAmount || 0;
  const delivery = billingSummary?.deliveryAmount || 0;
  const total = billingSummary?.total || 0;

  return (
    <div className="guestCheckout_summary p-6 rounded-2xl bg-gradient-to-br from-red-200/30 to-teal-300/30 backdrop-blur-md shadow-md border border-white/20 flex flex-col h-full">
      <h3
        className="text-2xl font-semibold mb-4"
        style={{ fontFamily: "cursive" }}
      >
        Billing Summary
      </h3>

      {/* Scrollable Cart Items (flex-grow takes remaining space) */}
      <div
        className="overflow-y-auto pr-2 mb-4"
        style={{
          maxHeight: "384px", // Height for 3 items (128px per item)
          minHeight: "384px", // Ensures consistent height even if <3 items
        }}
      >
        <div className="grid grid-cols-1 gap-2">
          {cartData.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-md shadow-md bg-white flex justify-between items-center h-32" // Fixed height per item
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${BASE_URL}/${item.image}`}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-teal-600">
                  ৳{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Summary & Button (Sticky Bottom) */}
      <div className="sticky bottom-0 bg-white p-6 rounded-lg shadow-lg mt-auto">
        <ul className="space-y-4 text-base sm:text-xl">
          <li className="flex justify-between text-gray-700">
            <span className="font-medium">Subtotal</span>
            <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span className="font-medium">Discount</span>
            <span className="text-green-600 font-semibold">
              -৳{discount.toFixed(2)}
            </span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span className="font-medium">Delivery</span>
            <span className="font-semibold">৳{delivery.toFixed(2)}</span>
          </li>
          <li className="border-t border-dashed pt-4 mt-4 flex justify-between text-2xl font-bold text-gray-900">
            <span>Total</span>
            <span>৳{total.toFixed(2)}</span>
          </li>
        </ul>
        <button
          onClick={handlePlaceOrder}
          className="w-full text-3xl p-4 border rounded-lg bg-[#010B40] my-4 text-white hover:bg-[#020E50] transition-colors"
          style={{ textShadow: "0 3px 4px #333" }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default GuestBillingSummary;
