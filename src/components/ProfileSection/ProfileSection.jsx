import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";
const ProfileSection = ({
  image,
  name,
  email,
  phone,
  address,
  handleImageClick,
  handleImageUpload,
  onSave,
}) => {
  const { BASE_URL } = useProductStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedAddress, setEditedAddress] = useState(address || "");

  const handleProfileSave = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      if (!token) {
        throw new Error("No token available!");
      }

      const payload = {
        name: editedName,
        email: editedEmail,
        phone_number: editedPhone,
        address: editedAddress,
      };
      console.log(userData, "userData");
      const updatedUserData = {
        ...userData,
        profile: {
          data: {
            ...userData?.profile?.data,
            name: editedName,
            email: editedEmail,
            phone_number: editedPhone,
            address: editedAddress,
          },
        },
      };

      // Ensure that you only send the relevant data
      const response = await fetch(`${BASE_URL}/api/change-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        // Update the user data in localStorage
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        alert("Profile updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong while updating the profile");
    }
  };

  // console.log(sanitizedUserData, "sanitizedUserData");
  // console.log(payload, "payload");
  // console.log(result, "result");

  return (
    <div className="profile-edit-form text-2xl">
      <div className="relative w-60 h-60">
        {/* Profile Image */}
        <img
          src={image}
          alt="Profile"
          className="rounded-full w-full h-full object-cover cursor-pointer transition-all duration-300"
          onClick={handleImageClick}
        />

        {/* Edit Icon */}
        <div
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer"
        >
          <FaEdit className="text-blue-500" />
        </div>

        {/* Tooltip/Instruction */}
        {isEditing && (
          <div className="absolute top-0 left-0 text-white bg-black bg-opacity-50 p-2 rounded-md">
            Click to upload a new image
          </div>
        )}

        {/* Hidden File Input for Image Upload */}
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Name Field */}
      <label htmlFor="name" className="block text-gray-700 mt-4">
        Name
      </label>
      <input
        type="text"
        id="name"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        className="w-full p-2 mt-2 border rounded-md"
        disabled={!isEditing}
      />

      {/* Email Field */}
      <label htmlFor="email" className="block text-gray-700 mt-4">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={editedEmail}
        onChange={(e) => setEditedEmail(e.target.value)}
        className="w-full p-2 mt-2 border rounded-md"
        placeholder={`${
          editedEmail ? editedEmail : "ℹ️Please enter your Email"
        }`}
        disabled={!isEditing}
      />

      {/* Phone Field */}
      <label htmlFor="phone" className="block text-gray-700 mt-4">
        Phone
      </label>
      <input
        type="tel"
        id="phone"
        value={editedPhone}
        onChange={(e) => setEditedPhone(e.target.value)}
        className="w-full p-2 mt-2 border rounded-md"
        placeholder={`${
          editedPhone ? editedPhone : "ℹ️Please enter your phone number"
        }`}
        disabled={!isEditing}
      />
      {/* Phone Field */}

      <label htmlFor="address" className="block text-gray-700 mt-4">
        Address
      </label>
      <input
        type="text"
        id="address"
        value={editedAddress}
        onChange={(e) => setEditedAddress(e.target.value)}
        className="w-full p-2 mt-2 border rounded-md"
        placeholder={editedAddress || "ℹ️Please enter your address"}
        disabled={!isEditing}
      />

      {/* Conditional Rendering of Buttons */}
      <div className="mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleProfileSave}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditing(false)} // Cancel editing
              className="ml-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)} // Start editing
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
