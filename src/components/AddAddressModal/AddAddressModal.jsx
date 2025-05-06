import React, { useState } from "react";
import { useProductStore } from "../../providers/AppProviders";

const AddAddressModal = ({ onClose, onSave }) => {
  const {
    BASE_URL,
    userData,
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
  const {
    name: fullName,
    phone_number: phoneNumber,
    address: streetAddress,
  } = userData ? userData.profile.data : null;
  console.log(name, phoneNumber);
  console.log(userData);
  const [formData, setFormData] = useState({
    name: fullName || "",
    phone: phoneNumber || "",
    street: streetAddress || "",
    division: "",
    district: "",
    thana: "",
    union: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, "id");
    console.log(value, "value");
    const stringDivisions = divisions?.divisions[value];

    setFormData((prev) => ({ ...prev, [id]: value }));

    //Updating context on input change
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
  console.log(userData);
  const handleSubmit = async () => {
    const payload = {
      username: formData.name,
      phone_number: formData.phone,
      address: formData.street,
      division_id: formData.division,
      district_id: formData.district,
      thana_id: formData.thana,
      union_id: formData.union,
      postal_code: formData.zipCode,
    };
    console.log(payload, "payload");
    try {
      const response = await fetch(`${BASE_URL}/api/user/addresss/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data, "data-----");
      if (!response.ok) {
        throw new Error(data.message || "Failed to save address");
      }

      onSave(data.billingAddresses); // Send saved address back to parent if needed
      onClose();
    } catch (error) {
      console.error("Error saving address:", error.message);
      alert(error.message); // Or handle with a better UI
    }
  };

  console.log("divisions", divisions);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-5xl p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 ">Add New Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Input Fields */}
          {/* Full Name */}
          <div>
            <label className="block text-xl font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              id="fullName"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-md text-xl"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xl font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-md text-xl"
            />
          </div>

          {/* Street Address - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-xl font-medium mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="street"
              id="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border p-3 rounded-md text-xl"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-xl font-medium mb-2">Zip Code</label>
            <input
              type="number"
              id="zipCode"
              value={formData.zipcode}
              onChange={handleChange}
              className="w-full border p-3 rounded-md text-xl"
            />
          </div>

          {/* Dropdowns */}
          {[
            {
              label: "Division",
              name: "division",
              id: "division",
              options: divisions.divisions,
            },
            {
              label: "District",
              name: "district",
              id: "district",
              options: districts.districts,
            },
            {
              label: "Thana",
              name: "thana",
              id: "thana",
              options: thanas.thanas,
            },
            {
              label: "Union",
              name: "union",
              id: "union",
              options: unions.unions,
            },
          ].map(({ label, id, name, options }) => (
            <div className="col-span-1" key={name}>
              <label className="block text-xl font-medium mb-2">{label}</label>
              <select
                name={name}
                value={formData[name]}
                id={id}
                onChange={handleChange}
                className="w-full border p-3 rounded-md text-xl"
              >
                <option value="">Select {label}</option>
                {options?.map((opt) => (
                  <option key={opt?.id} value={opt?.id}>
                    {opt?.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
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
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
