import React, { useState } from "react";
import UserCheckoutHeader from "../../components/UserCheckoutHeader/UserCheckoutHeader";
import { Modal, Box } from "@mui/material";

const UserCheckoutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  const userAddresses = [
    { id: 1, address: "123/A, Gulshan, Dhaka" },
    { id: 2, address: "456/B, Dhanmondi, Dhaka" },
  ];

  const cartItems = [
    {
      id: 1,
      name: "Cotton T-Shirt",
      qty: 2,
      price: 500,
      image: "https://via.placeholder.com/80x80?text=T-Shirt",
    },
    {
      id: 2,
      name: "Running Shoes",
      qty: 1,
      price: 1500,
      image: "https://via.placeholder.com/80x80?text=Shoes",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const delivery = 60;
  const total = subtotal + delivery;

  const handleSaveAddress = () => {
    if (newAddress.trim()) {
      // In a real app, you would add this to your addresses state or API
      alert(`New address added: ${newAddress}`);
      setNewAddress("");
      setShowModal(false);
    }
  };

  return (
    <div className="checkout_content">
      <UserCheckoutHeader />

      <div className="checkout_fullForm">
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
          <div className="flex flex-col gap-y-3">
            {userAddresses.map((addr) => (
              <label
                key={addr.id}
                className={`border p-4 rounded-md cursor-pointer shadow-sm flex items-start gap-3 transition ${
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
                <div>
                  <p className="font-medium text-gray-800">{addr.address}</p>
                 
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Right - Summary Section */}
        <div className="checkout_summary">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="cart_items space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="font-medium">৳{item.price * item.qty}</p>
              </div>
            ))}
          </div>

          <div className="order_totals mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge:</span>
              <span>৳{delivery}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t">
              <span>Total:</span>
              <span>৳{total}</span>
            </div>
          </div>

          <button
            className="make_order_btn w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition"
            disabled={!selectedAddress}
          >
            {selectedAddress ? "Place Order" : "Please select an address"}
          </button>
        </div>
      </div>

      <Modal
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
      </Modal>
    </div>
  );
};

export default UserCheckoutPage;
