import React, { useEffect, useState } from "react";
import UserCheckoutHeader from "../../components/UserCheckoutHeader/UserCheckoutHeader";
import { Modal, Box } from "@mui/material";
import { useProductStore } from "../../providers/AppProviders";
import AddressModal from "../../components/AddAddressModal/AddAddressModal";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

const UserCheckoutPage = () => {
  const {
    billingAddress,
    showModal,
    setShowModal,
    editAddress,
    setEditAddress,
    deleteAddress,
  } = useProductStore();
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
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-base sm:text-lg">
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
