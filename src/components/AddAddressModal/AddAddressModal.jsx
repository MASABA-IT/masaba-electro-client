import React, { useEffect, useState } from "react";
import { useProductStore } from "../../providers/AppProviders";
import Swal from "sweetalert2";

const AddressModal = ({ onClose, onSave, defaultAddress = null }) => {
  const {
    BASE_URL,
    userData,
    divisions,
    districts,
    thanas,
    unions,
    setSelectedDivision,
    setSelectedDistrict,
    setSelectedThana,
    setSelectedUnion,
    fetchBillingAddress,
    saveUserAddress,
  } = useProductStore();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    division: "",
    district: "",
    thana: "",
    union: "",
    zipCode: "",
  });

  // Prefill form if defaultAddress is passed
  useEffect(() => {
    if (defaultAddress) {
      setFormData({
        name: defaultAddress.username || "",
        phone: defaultAddress.phone_number || "",
        street: defaultAddress.address || "",
        division: defaultAddress.division_id || "",
        district: defaultAddress.district_id || "",
        thana: defaultAddress.thana_id || "",
        union: defaultAddress.union_id || "",
        zipCode: defaultAddress.postal_code || "",
      });

      // Set context for address-related dropdowns
      setSelectedDivision(defaultAddress.division_id || "");
      setSelectedDistrict(defaultAddress.district_id || "");
      setSelectedThana(defaultAddress.thana_id || "");
      setSelectedUnion(defaultAddress.union_id || "");
    }
  }, [
    defaultAddress,
    setSelectedDivision,
    setSelectedDistrict,
    setSelectedThana,
    setSelectedUnion,
  ]);

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [id]: value }));

  //   // Update context based on selected division, district, thana, or union
  //   if (id === "division") setSelectedDivision(value);
  //   if (id === "district") setSelectedDistrict(value);
  //   if (id === "thana") setSelectedThana(value);
  //   if (id === "union") setSelectedUnion(value);
  // };
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Update form state
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Only update context if there's a selected value, otherwise clear it
    switch (id) {
      case "division":
        setSelectedDivision(value || ""); // pass empty string if not selected
        break;
      case "district":
        setSelectedDistrict(value || "");
        break;
      case "thana":
        setSelectedThana(value || "");
        break;
      case "union":
        setSelectedUnion(value || "");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    saveUserAddress({ formData, defaultAddress, onSave, onClose });
  };
  const inputClass =
    "w-full border p-3 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500";
  useEffect(() => {
    if (userData?.token) {
      fetchBillingAddress();
    }
  }, [userData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-5xl p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">
          {defaultAddress ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xl font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter phone number"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xl font-medium mb-2">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              value={formData.street}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter street address"
            />
          </div>

          <div>
            <label className="block text-xl font-medium mb-2">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter zip code"
            />
          </div>

          {[
            {
              label: "Division",
              id: "division",
              options: divisions?.divisions,
            },
            {
              label: "District",
              id: "district",
              options: districts?.districts,
            },
            {
              label: "Thana",
              id: "thana",
              options: thanas?.thanas,
            },
            {
              label: "Union",
              id: "union",
              options: unions?.unions,
            },
          ].map(({ label, id, options }) => (
            <div key={id}>
              <label className="block text-xl font-medium mb-2">{label}</label>
              <select
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select {label}</option>
                {options?.map((opt) => (
                  <option key={opt.id} value={opt?.id ? opt.id : ""}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 text-xl">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          >
            {defaultAddress ? "Update Address" : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
