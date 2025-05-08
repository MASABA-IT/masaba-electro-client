import React, { useEffect } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate } from "react-router-dom";

const CartSummary = ({
  cartData,
  onCheckout,
  paymentOptions = [
    { id: 12, src: "/src/assets/imgs/payment1.png", alt: "Payment Option 1" },
    { id: 22, src: "/src/assets/imgs/payment2.png", alt: "Payment Option 2" },
    { id: 32, src: "/src/assets/imgs/payment3.png", alt: "Payment Option 3" },
    { id: 42, src: "/src/assets/imgs/payment4.png", alt: "Payment Option 4" },
    { id: 52, src: "/src/assets/imgs/payment5.png", alt: "Payment Option 5" },
  ],
}) => {
  const {
    handleApplyCoupon,
    couponCode,
    setCouponCode,
    couponResponse,
    deliveryOptions,
    selectedDeliveryId,
    setSelectedDeliveryId,
    deliveryAmount,
    selectedDelivery,
    selectedDeliveryTitle,
  } = useProductStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const userData = localStorage.getItem("userData");

    // Prepare billing summary
    const billingSummary = {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      deliveryAmount: parseFloat(deliveryAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      selectedDelivery: selectedDelivery,

      appliedCoupon: couponResponse?.coupon || null,
    };

    // Save to localStorage
    localStorage.setItem("billingSummary", JSON.stringify(billingSummary));

    // Redirect
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed?.token) {
        onCheckout();
        return;
      }
    }

    navigate("/guest-checkout");
  };

  const subtotal = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  let discountAmount = 0;

  const isCouponExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return today > expiry;
  };

  if (
    couponResponse?.coupon &&
    !isCouponExpired(couponResponse.coupon.expiry_date)
  ) {
    const coupon = couponResponse.coupon;
    const percentage = parseFloat(coupon.discount_percentage);
    const fixedDiscount = parseFloat(coupon.discount_price);

    if (percentage > 0) {
      discountAmount = (subtotal * percentage) / 100;
    } else if (fixedDiscount > 0) {
      discountAmount = fixedDiscount;
    }
  }

  const total = parseFloat(
    (subtotal - discountAmount + deliveryAmount).toFixed(2)
  );
  useEffect(() => {
    if (deliveryOptions.length > 0 && selectedDeliveryId === null) {
      setSelectedDeliveryId(deliveryOptions[0].id);
    }
  }, [deliveryOptions]);
  return (
    <div className="carts_totalAmount flex flex-col gap-y-4">
      {/* Coupon section */}
      <div className="coupon-section bg-white p-6 rounded-lg border">
        <h2 className="text-2xl font-bold py-2">Have a coupon code?</h2>
        <div className="flex items-center text-2xl">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border p-3 w-full rounded-l-lg outline-none"
          />
          <button
            onClick={handleApplyCoupon}
            className="text-blue-400 px-6 py-3 rounded-r-lg border duration-75"
          >
            Apply
          </button>
        </div>
        {couponResponse?.coupon &&
          isCouponExpired(couponResponse.coupon.expiry_date) && (
            <p className="text-red-500 mt-2">❌ Coupon expired</p>
          )}
        {couponResponse?.coupon &&
          !isCouponExpired(couponResponse.coupon.expiry_date) && (
            <p className="text-green-500 mt-2">
              ✅ Coupon applied:{" "}
              {parseFloat(couponResponse.coupon.discount_percentage) > 0
                ? `${couponResponse.coupon.discount_percentage}%`
                : `৳${couponResponse.coupon.discount_price}`}{" "}
              discount!
            </p>
          )}
      </div>

      {/* Delivery Option Select */}
      <div className="bg-white p-6 rounded-lg border">
        <label className="text-xl font-semibold block mb-2">
          Choose Delivery Area:
        </label>
        <select
          value={selectedDeliveryId}
          onChange={(e) => setSelectedDeliveryId(Number(e.target.value))}
          className="border text-xl p-3 w-full rounded-md outline-none"
        >
          {deliveryOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.title} (+৳{parseFloat(opt.amount)})
            </option>
          ))}
        </select>
      </div>

      {/* Price breakdown */}
      <div className="flex flex-col bg-white p-6">
        <div className="price-breakdown mb-6">
          <table className="w-full table-auto">
            <tbody>
              <tr>
                <td className="text-xl font-semibold py-2">Subtotal</td>
                <td className="text-xl font-semibold py-2 text-right">
                  ৳{parseFloat(subtotal)}
                </td>
              </tr>
              <tr>
                <td className="text-xl font-semibold py-2 text-red-500">
                  Discount
                </td>
                <td className="text-xl font-semibold py-2 text-right text-red-500">
                  -৳{parseFloat(discountAmount)}
                </td>
              </tr>
              <tr>
                <td className="text-xl font-semibold py-2">
                  Delivery ({selectedDeliveryTitle})
                </td>
                <td className="text-xl font-semibold py-2 text-right">
                  +৳{deliveryAmount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="border-t border-gray-300 my-4" colSpan="2"></td>
              </tr>
              <tr>
                <td className="text-2xl font-semibold py-2">Total</td>
                <td className="text-2xl xl:text-3xl font-semibold py-2 text-right">
                  ৳{parseFloat(total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Checkout */}
        <div className="w-full checkout-section text-right">
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white text-2xl px-6 py-3 rounded-lg hover:bg-green-600 duration-75"
            style={{ textShadow: "0 2px 8px #333" }}
          >
            Checkout
          </button>
        </div>

        {/* Payment methods */}
        {/* <div className="payment-method-section bg-white p-4 xl:p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Payment Options</h2>
          <div className="flex justify-center gap-x-3 xl:gap-6 flex-wrap">
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
        </div> */}
      </div>
    </div>
  );
};

export default CartSummary;
