import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";
import GuestCheckoutHeader from "../../components/GuestCheckoutHeader/GuestCheckoutHeader";
import GuestBillingSummary from "../../components/GuestBillingSummary/GuestBillingSummary";

const GuestCheckoutPage = () => {
  const {
    BASE_URL,
    divisions,
    districts,
    thanas,
    unions,
    selectedDivision,
    selectedDistrict,
    selectedThana,
    selectedUnion,
    setSelectedDivision,
    setSelectedDistrict,
    setSelectedThana,
    setSelectedUnion,
    logo,
  } = useProductStore();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const billingSummary = JSON.parse(localStorage.getItem("billingSummary"));
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: null,
    division: "",
    district: "",
    thana: "",
    union: "",
  });
  console.log("formData", formData);
  // Effect to handle the cascading logic of selections
  useEffect(() => {
    if (selectedDivision) {
      setFormData((prev) => ({
        ...prev,
        division: selectedDivision,
        district: "",
        thana: "",
        union: "",
      }));
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      setFormData((prev) => ({
        ...prev,
        district: selectedDistrict,
        thana: "",
        union: "",
      }));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedThana) {
      setFormData((prev) => ({
        ...prev,
        thana: selectedThana,
        union: "",
      }));
    }
  }, [selectedThana]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const stringDivisions = divisions?.divisions[value];

    setFormData((prev) => ({ ...prev, [id]: value }));

    // Updating context on input change
    if (id === "division") {
      setSelectedDivision(stringDivisions.id);
    } else if (id === "district") {
      setSelectedDistrict(value);
    } else if (id === "thana") {
      setSelectedThana(value);
    } else if (id === "union") {
      setSelectedUnion(value);
    }
  };

  const handlePlaceOrder = async () => {
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    const products = cartData.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const body = {
      username: formData.fullName,
      phone_number: formData.phone,
      email: formData.email,
      address: formData.address,
      postal_code: formData.zipCode,
      division_id: formData.division,
      district_id: formData.district,
      thana_id: formData.thana,
      union_id: formData.union,
      products,
      payment_method: "cashOnDelivery",
      delivery_charge_id: billingSummary.selectedDelivery.id,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/guest/order-place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Order failed");

      const result = await response.json();
      const orderId = result.order.id;

      // Clear localStorage and form
      localStorage.removeItem("cartData");
      localStorage.removeItem("billingSummary");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        zipCode: "",
        division: "",
        district: "",
        thana: "",
        union: "",
      });

      // 🔔 Show success modal with logo
      showSuccessAlert(
        "Order Placed!",
        "Your order has been placed successfully.",
        logo,
        orderId
      );
    } catch (err) {
      alert("Failed to place order.");
    }
  };

  const showSuccessAlert = (title, message, logo, orderId) => {
    Swal.fire({
      title: `<strong style="font-size: 18px;">${title}Your order details and tracking information have been sent to your email.</strong>`,
      html: `
      <p style="margin-bottom: 6px;">${message}</p>
      <p style="font-size: 14px; color: #065f46;"><strong>Order ID:</strong> #${orderId}</p>
    `,
      text: message,
      icon: "success",
      confirmButtonText: "OK",
      background: "#ecfdf5",
      color: "#065f46",
      customClass: {
        popup: "rounded-2xl p-6 shadow-xl",
        confirmButton:
          "bg-[#065f46] text-white px-4 py-2 rounded mt-4 text-base",
        icon: "swal2-icon-success",
        title: "mt-6 text-center text-lg font-semibold",
      },
      imageUrl: logo ? `${BASE_URL}/${logo}` : "/assets/logo/nav-logo.svg",
      imageAlt: "Logo",
      imageWidth: 50,
      imageHeight: 50,
      imageClass: "absolute top-4 right-4",
      allowOutsideClick: false,
    }).then(() => {
      // ✅ Full page reload to home after OK
      window.location.href = "/";
    });
  };

  return (
    <div className="guestCheckout_content min-h-screen bg-stone-50">
      {/* Header */}
      <GuestCheckoutHeader />

      {/* Main content: form and billing */}
      <div className="guestcheckout_fullForm p-10">
        {/* Left: Scrollable Form */}
        <div className="guestCheckout_form max-h-[80vh] overflow-y-auto rounded-lg">
          <h2
            className="text-3xl text-gray-600 font-semibold mb-4"
            style={{ fontFamily: "cursive" }}
          >
            Billing details
          </h2>

          {/* Sample form inputs */}
          <form className="space-y-6 text-base md:text-lg mx-auto">
            {/* Full Name */}
            <div className="relative ">
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border text-2xl border-gray-300  p-3 pt-8 rounded-md focus:outline-none "
              />
              <label
                htmlFor="fullName"
                className="absolute left-4 top-3 text-gray-500 text-2xl transition-all
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-2xl
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xl
                peer-focus:text-teal-600"
              >
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none  "
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2  text-gray-500 text-2xl transition-all
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-2xl
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xl
                peer-focus:text-teal-600"
              >
                Email Address
              </label>
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none  "
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-2 text-gray-500 text-2xl transition-all
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-2xl
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xl
                peer-focus:text-teal-600"
              >
                Phone Number
              </label>
            </div>
            {/* Address*/}
            <div className="relative">
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none  "
              />
              <label
                htmlFor="address"
                className="absolute left-4 top-2 text-gray-500 text-2xl transition-all
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-2xl
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xl
                peer-focus:text-teal-600"
              >
                Your Address
              </label>
            </div>
            {/* Address*/}
            <div className="relative">
              <input
                type="number"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none  "
              />
              <label
                htmlFor="zipCode"
                className="absolute left-4 top-2 text-gray-500 text-2xl transition-all
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-2xl
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xl
                peer-focus:text-teal-600"
              >
                Your ZIP Code
              </label>
            </div>

            {/* Location Selectors */}
            <div className="grid grid-cols-2 gap-4">
              {/* Division */}
              <div className="relative ">
                <select
                  id="division"
                  value={formData?.divisions}
                  onChange={handleChange}
                  className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md bg-white focus:outline-none  "
                >
                  <option value="">Select Division</option>
                  {divisions?.divisions?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="division"
                  className="absolute left-4 top-3 text-gray-500 text-xl transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600"
                >
                  Division
                </label>
              </div>

              {/* District */}
              <div
                className={`relative ${
                  districts.districts && !selectedDistrict
                    ? "border-2 border-green-400 rounded-md"
                    : ""
                }`}
              >
                <select
                  id="district"
                  value={formData?.districts}
                  onChange={handleChange}
                  className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md bg-white focus:outline-none  "
                >
                  <option value="">Select District</option>
                  {districts?.districts?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="district"
                  className="absolute left-4 top-3 text-gray-500 text-xl transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600"
                >
                  District
                </label>
              </div>

              {/* Thana */}
              <div
                className={`relative ${
                  thanas.thanas && !selectedThana
                    ? "border-2 border-green-400"
                    : ""
                }`}
              >
                <select
                  id="thana"
                  value={formData.thanas}
                  onChange={handleChange}
                  className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md bg-white focus:outline-none  "
                >
                  <option value="">Select Thana</option>
                  {thanas?.thanas?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="thana"
                  className="absolute left-4 top-3 text-gray-500 text-xl transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600"
                >
                  Thana
                </label>
              </div>

              {/* Union */}
              <div
                className={`relative ${
                  unions.unions && !selectedUnion
                    ? "border-2 border-green-400"
                    : ""
                }`}
              >
                <select
                  id="union"
                  value={formData.union}
                  onChange={handleChange}
                  className="peer w-full border text-2xl  border-gray-300 p-4 pt-8 rounded-md bg-white focus:outline-none  "
                >
                  <option value="">Select Union</option>
                  {unions?.unions?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="union"
                  className="absolute left-4 top-3 text-gray-500 text-xl transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600"
                >
                  Union
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Billing Summary - Sticky */}
        <GuestBillingSummary handlePlaceOrder={handlePlaceOrder} />
      </div>
    </div>
  );
};

export default GuestCheckoutPage;
