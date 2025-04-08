import React, { useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CartSummary from "../../components/CartSummary/CartSummary";
import SecureInfoPanel from "../../components/SecureInfoPanel/SecureInfoPanel";
import CartLetterSave from "../../components/CartLetterSave/CartLetterSave";
import ProductDetailsDiscount from "../../components/ProductDetailsDiscount/ProductDetailsDiscount";

const AllCartPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cartData, setCartData] = useState([
    {
      id: 1,
      image: "/src/assets/imgs/reItem1.png",
      title: "T-shirts with multiple colors, for men and lady",
      size: "Medium",
      color: "Blue",
      material: "Plastic",
      seller: "Artel Market",
      price: 78.99,
      quantity: 2,
    },
    {
      id: 2,
      image: "/src/assets/imgs/item1.png",
      title: "Running Shoes - Unisex",
      size: "10",
      color: "Black",
      material: "Leather",
      seller: "Runner's World",
      price: 120.5,
      quantity: 1,
    },
    {
      id: 3,
      image: "/src/assets/imgs/item2.png",
      title: "Smart Watch Series 7",
      size: "One Size",
      color: "Silver",
      material: "Metal",
      seller: "Tech Hub",
      price: 199.99,
      quantity: 1,
    },
  ]);
  const paymentOptions = [
    { src: "/src/assets/imgs/payment1.png", alt: "Payment Option 1" },
    { src: "/src/assets/imgs/payment2.png", alt: "Payment Option 2" },
    { src: "/src/assets/imgs/payment3.png", alt: "Payment Option 3" },
    { src: "/src/assets/imgs/payment4.png", alt: "Payment Option 4" },
    { src: "/src/assets/imgs/payment5.png", alt: "Payment Option 5" },
  ];
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Update quantity in the cart
  const updateItemQuantity = (id, newQuantity) => {
    const updatedCart = cartData.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartData(updatedCart);
  };

  // Remove Item Logic
  const removeItem = (id) => {
    const newCart = cartData.filter((item) => item.id !== id);
    setCartData(newCart);

    if (newCart.length === 0) {
      setNotification("Your cart is empty!");
    } else {
      setNotification("Item removed from cart.");
    }

    setTimeout(() => setNotification(null), 3000);
  };

  // Save for Later (Placeholder)
  const saveForLater = (id) => {
    console.log(`Item ${id} saved for later`);
    setNotification("Item saved for later.");
    setTimeout(() => setNotification(null), 3000);
  };

  // Navigate Back to Shop
  const goToShop = () => {
    navigate("/categories");
  };

  // Clear All Items in Cart
  const clearAll = () => {
    if (cartData.length > 0) {
      setCartData([]);
      setNotification("All items have been removed from your cart.");
    } else {
      setNotification("Your cart is already empty.");
    }
    setTimeout(() => setNotification(null), 3000);
  };
  // Apply Coupon Code
  const applyCoupon = () => {
    // Simulate a valid coupon check
    const validCoupons = {
      DISCOUNT10: 10, // 10% discount
      DISCOUNT20: 20, // 20% discount
    };

    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
      setNotification(
        `Coupon applied! You get ${validCoupons[couponCode]}% off.`
      );
    } else {
      setNotification("Invalid coupon code.");
    }

    setTimeout(() => setNotification(null), 3000);
  };

  const onCheckout = () => {
    console.log("Proceeding to checkout");
    // Logic for checkout
  };
  return (
    <div className="carts">
      <h2 className="carts_count xl:text-4xl py-4 px-6 font-semibold">
        My cart <span>&#40;{cartData.length}&#41;</span>
      </h2>

      {/* Notification display */}
      {notification && (
        <div className="notification fixed top-0 left-0 w-full bg-blue-500 text-white text-center py-4">
          {notification}
        </div>
      )}

      {/* Cart Items or Empty State */}
      <div className="carts_present bg-white">
        {cartData.length === 0 ? (
          <div
            className="text-center text-xl font-semibold text-gray-500 py-10"
            style={{ height: "140px" }} // Fixed height for smooth layout
          >
            Your cart is empty. Start shopping now!
          </div>
        ) : (
          cartData.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeItem={removeItem}
              saveForLater={saveForLater}
              updateItemQuantity={updateItemQuantity} // Passing callback
            />
          ))
        )}

        {/* Action Buttons */}
        <div className="flex justify-between px-6 py-4">
          <button
            onClick={goToShop}
            className="flex justify-center items-center gap-4 text-[1.6rem] bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 duration-75"
          >
            <LuArrowLeft className="text-4xl" />
            Back to shop!
          </button>
          <button
            onClick={clearAll}
            disabled={cartData.length === 0} // Disable button if cart is empty
            className={`text-[1.6rem] ${
              cartData.length === 0
                ? "bg-zinc-100 text-gray-300 cursor-not-allowed"
                : "bg-zinc-100 text-red-400 hover:bg-gray-200 hover:text-red-500"
            } px-6 py-3 rounded-lg duration-75`}
          >
            {cartData.length === 0 ? "Your cart is empty" : "Remove all"}
          </button>
        </div>
      </div>

      {/* Total Amount Placeholder */}
      <CartSummary
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        applyCoupon={applyCoupon}
        cartData={cartData}
        discount={22.0}
        tax={22.0}
        onCheckout={onCheckout}
        paymentOptions={paymentOptions}
      />
      <SecureInfoPanel />
      <CartLetterSave />
      <div className="cart_discount">
        <ProductDetailsDiscount />
      </div>
    </div>
  );
};

export default AllCartPage;
