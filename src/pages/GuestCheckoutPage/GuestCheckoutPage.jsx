import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import checkout from "../../assets/imgs/shoppingBag.webp";
import { FaShoppingBag } from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";

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
  } = useProductStore();

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
    console.log(divisions, "-----");

    // Updating context on input change
    if (id === "division") {
      setSelectedDivision(stringDivisions.id);
    } else if (id === "district") {
      setSelectedDistrict(value);
      console.log("district", value);
    } else if (id === "thana") {
      setSelectedThana(value);
    } else if (id === "union") {
      console.log("uinon", value);
      setSelectedUnion(value);
    }
  };

  console.log("formData", formData);
  console.log(districts);
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  console.log(cartData);
  return (
    <div className="guestCheckout_content min-h-screen bg-stone-50">
      {/* Header */}
      <div className="w-full guestCheckout_header bg-gradient-to-br from-cyan-600 to-teal-500 text-white shadow-md min-h-[200px] flex justify-center items-center relative overflow-hidden">
        {/* Left Side - Image (object-contain) */}
        <div className="absolute top-1/2 left-1/3 transform -translate-x-[60%] -translate-y-1/2 h-full p-4">
          <img
            src={checkout}
            alt="Checkout"
            className="w-[70%] h-[90%] object-contain"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="w-2/3 flex flex-col justify-center items-center text-center px-4 gap-y-4">
          <h1
            className="text-2xl md:text-5xl font-bold"
            style={{ textShadow: "0 2px 4px #777" }}
          >
            Guest Checkout
          </h1>
          <h3 className="text-lg md:text-2xl font-semibold">
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>{" "}
            &gt; <span className="text-yellow-300">Shop Checkout</span>
          </h3>
        </div>
      </div>

      {/* Main content: form and billing */}
      <div className="guestcheckout_fullForm p-10">
        {/* Left: Scrollable Form */}
        <div className="guestCheckout_form max-h-[80vh] overflow-y-auto rounded-lg">
          <h2
            className="text-4xl font-semibold mb-4"
            style={{ fontFamily: "cursive" }}
          >
            Billing details
          </h2>

          {/* Sample form inputs */}
          <form className="space-y-6 text-base md:text-lg mx-auto">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
              <label
                htmlFor="fullName"
                className="absolute left-4 top-2 text-gray-500 text-2xl transition-all
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
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                  className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md bg-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                  className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md bg-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                  className="peer w-full border text-2xl border-gray-300 p-4 pt-8 rounded-md bg-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
                  className="peer w-full border text-2xl  border-gray-300 p-4 pt-8 rounded-md bg-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
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
        <div className="guestCheckout_summary">
          <h3 className="text-xl font-semibold mb-4">Billing Summary</h3>
          <div className="grid grid-cols-1 gap-4">
            {cartData?.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-md shadow-md bg-white flex justify-between items-center"
              >
                {/* Left side: Image + Title */}
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

                {/* Right side: Total price */}
                <div className="text-right">
                  <p className="text-xl font-bold text-teal-600">
                    ৳{parseFloat((item.price * item.quantity).toFixed(2))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow sticky top-10">
            <ul className="space-y-2 text-lg">
              <li>Subtotal: ৳1200</li>
              <li>Discount: ৳100</li>
              <li>Delivery: ৳80</li>
              <li className="font-bold text-xl mt-2">Total: ৳1180</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckoutPage;
