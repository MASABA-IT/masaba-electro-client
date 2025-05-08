import React, { useEffect, useState } from "react";
import UserCheckoutHeader from "../../components/UserCheckoutHeader/UserCheckoutHeader";
import { Modal, Box } from "@mui/material";
import { useProductStore } from "../../providers/AppProviders";
import AddressModal from "../../components/AddAddressModal/AddAddressModal";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaPercentage } from "react-icons/fa";

const UserCheckoutPage = () => {
  const {
    BASE_URL,
    billingAddress,
    showModal,
    setShowModal,
    editAddress,
    setEditAddress,
    deleteAddress,
    cartData,
    sendOrderToServer,
    setCartData,
  } = useProductStore();
  const [billingSmry, setBillingSmry] = useState(() => {
    const stored = localStorage.getItem("billingSummary");
    return stored ? JSON.parse(stored) : null;
  });

  // const [showModal, setShowModal] = useState(false);s
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);
  useEffect(() => {
    if (Array.isArray(billingAddress)) {
      setUserAddresses(billingAddress);
    } else {
      setUserAddresses([]);
    }
  }, [billingAddress]);

  const subtotal = cartData.reduce((sum, item) => {
    const quantity = item.quantity ?? 1;
    return sum + parseFloat(item.price) * quantity;
  }, 0);

  const appliedCoupon = billingSmry?.appliedCoupon;

  let couponAmount = {
    type: null,
    value: 0,
  };

  if (appliedCoupon) {
    const percentage = parseFloat(appliedCoupon.discount_percentage);
    const price = parseFloat(appliedCoupon.discount_price);
    console.log(percentage, "per");
    console.log(price, "price");
    if (!isNaN(percentage) && percentage > 0) {
      couponAmount = {
        type: "percentage",
        value: percentage,
      };
    } else if (!isNaN(price) && price > 0) {
      couponAmount = {
        type: "price",
        value: price,
      };
    }
  }

  const delivery = parseFloat(
    billingSmry?.deliveryAmount ?? billingSmry?.discountAmount ?? 0
  );

  // 🧮 Calculate actual discount:
  let discount = 0;
  if (couponAmount.type === "percentage") {
    discount = (subtotal * couponAmount.value) / 100;
  } else if (couponAmount.type === "price") {
    discount = couponAmount.value;
  }

  // 🧾 Final total:
  const total = subtotal - discount + delivery;

  const handleSaveAddress = () => {
    if (newAddress.trim()) {
      // In a real app, you would add this to your addresses state or API
      alert(`New address added: ${newAddress}`);
      setNewAddress("");
      setShowModal(false);
    }
  };

  // Selection handler
  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };
  const deletedPermission = (e, addr) => {
    e.stopPropagation();

    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
        title: "swal-title", // Custom class for title
        text: "swal-text", // Custom class for text
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion if confirmed
        deleteAddress(addr.id);

        // Success message after deleting the address
        Swal.fire({
          icon: "success",
          title: "Address Deleted!",
          text: "Your shipping address has been successfully deleted.",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            title: "swal-success-title",
            text: "swal-success-text",
          },
        });
      }
    });
  };
  // In AppProviders.js or your context:
  const clearCart = () => {
    setCartData([]);
    localStorage.removeItem("cartData");
  };

  // Dynamically build summary data
  const [finalOrderData, setFinalOrderData] = useState(null);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartData")) || [];

    const formattedProducts = storedCart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const updatedSummary = {
      products: formattedProducts,
      payment_method: "CashOnDelivery",
      billing_addresses_id: selectedAddress,
      delivery_charge_id: billingSmry?.selectedDelivery?.id,
      coupon_code_id: billingSmry.appliedCoupon?.id,
    };

    setFinalOrderData(updatedSummary);
  }, [selectedAddress]);
  const handleButtonClick = async () => {
    if (!finalOrderData) {
      console.warn("⚠️ No order data found.");
      return;
    }

    try {
      console.log("📦 Final Order Data:", finalOrderData);

      const result = await sendOrderToServer(finalOrderData);
      console.log("✅ API Response:", result);

      if (result?.success) {
        Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Your order was successfully placed.",
          showConfirmButton: false,
          timer: 2000,
          htmlContainer: "swal2-text-custom",
        });
        clearCart();
      } else {
        throw new Error(result?.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("❌ Error placing order:", error.message);
      Swal.fire({
        icon: "error",
        title: "Order Failed!",
        text: error.message || "Unable to place the order. Please try again.",
      });
    }
  };

  // const handleButtonClick = async () => {
  //   if (!finalOrderData) return;
  //   console.log(finalOrderData, "finalOrder");
  //   const result = await sendOrderToServer(finalOrderData);
  //   if (result?.success) {
  //     console.log("✅ Order successfully placed");
  //   } else {
  //     console.error("❌ Error placing order", result?.error);
  //   }
  // };

  return (
    <div className="checkout_content ">
      <UserCheckoutHeader />

      <div className="checkout_fullForm py-8">
        {/* Left - Form Section */}
        <div className="checkout_form">
          {/* Top Row: Title + Add New Address */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">User Details</h2>
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 underline text-xl md:text-2xl"
            >
              + Add New Address
            </button>
          </div>

          {/* Radio Card List */}
          <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2 flex flex-col gap-y-3">
            {userAddresses?.map((addr) => (
              <div
                key={addr?.user_id + addr.id}
                onClick={() => handleSelectAddress(addr.id)} // Select on left click
                onContextMenu={(e) => {
                  e.preventDefault(); // Prevent default right-click menu
                  handleSelectAddress(addr.id); // Select on right click
                }}
                className={`relative border rounded-md bg-white p-4 flex flex-col sm:flex-row gap-4 transition-all duration-200 cursor-pointer ${
                  selectedAddress === addr.id
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                {/* Radio Button */}
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  checked={selectedAddress === addr.id}
                  onChange={() => handleSelectAddress(addr.id)}
                  className="absolute top-4 left-4 w-4 h-4 accent-blue-600"
                />

                {/* Address Details */}
                <div className="ml-6 flex-1 text-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    📦 Shipping Info
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-base sm:text-xl">
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
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletedPermission(e, addr);
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
        </div>

        {/* Right - Summary Section */}
        <div className="checkout_summary">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="cart_items space-y-4">
            {cartData?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={`${BASE_URL}/${item?.image}`}
                    alt={item?.title}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-medium">{item?.title}</p>
                    <p className="text-gray-600 text-xl">
                      Quantity: {item?.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">৳{item.price}</p>
              </div>
            ))}
          </div>

          <div className="order_totals mt-6 space-y-2 text-xl">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge:</span>
              <span>৳{delivery}</span>
            </div>
            {couponAmount && (
              <div className="flex justify-between">
                <span className="">
                  Discount&nbsp;
                  {couponAmount?.type}:
                </span>

                <span>
                  {couponAmount?.type === "price" ? "৳" : "%"}
                  {couponAmount.value}
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold text-2xl mt-4 pt-2 border-t">
              <span>Total:</span>
              <span>৳{total}</span>
            </div>
          </div>

          <button
            onClick={handleButtonClick}
            className="make_order_btn w-full bg-indigo-400 text-white text-2xl py-3 rounded-lg mt-6 hover:bg-indigo-500 transition"
            disabled={!selectedAddress}
          >
            {selectedAddress ? "Place Order" : "ℹ️ Please select an address"}
          </button>
        </div>
      </div>
      {showModal && (
        <AddressModal
          defaultAddress={editAddress}
          onClose={() => setShowModal(false)}
          onSave={handleSaveAddress}
        />
      )}
      {/* <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "400px",
            maxWidth: "90vw",
          }}
        >
          <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
          <textarea
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter full address"
            className="border w-full p-2 mb-4 h-24"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAddress}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={!newAddress.trim()}
            >
              Save Address
            </button>
          </div>
        </Box>
      </Modal> */}
    </div>
  );
};

export default UserCheckoutPage;
