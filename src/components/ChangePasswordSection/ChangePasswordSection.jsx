import React, { useState } from "react";
import { useProductStore } from "../../providers/AppProviders";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePasswordSection = () => {
  const { BASE_URL } = useProductStore();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const toggleOldPassword = () => setShowOldPassword(!showOldPassword);
  // const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  // const toggleConfirmPassword = () =>
  //   setShowConfirmPassword(!showConfirmPassword);
  const handleForgotPassword = () => {
    alert("Redirecting to forgot password flow...");
    // Example: redirect to forgot password page
    // navigate("/forgot-password");
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters long!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;
      if (!token) {
        throw new Error("No token found");
      }

      const payload = {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      };
   console.log(payload,'payload');
      const response = await fetch(`${BASE_URL}/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result, "change-password result");

      if (response.ok && result.status === "success") {
        alert("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(result.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Something went wrong while changing the password");
    }
  };

  return (
    <div className="change-password-form mt-10 text-2xl">
      <h2 className="text-3xl font-bold mb-4">Change Password</h2>

      <div className="mb-4 relative">
        <label className="block mb-2 text-gray-700">Old Password</label>
        <input
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border rounded-md pr-10"
          placeholder="Enter old password"
        />
        <span
          className="absolute top-14 right-3 cursor-pointer text-gray-500"
          onClick={() => setShowOldPassword((prev) => !prev)}
        >
          {showOldPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="mb-4 relative">
        <label className="block mb-2 text-gray-700">New Password</label>
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded-md pr-10"
          placeholder="Enter new password"
        />
        <span
          className="absolute top-14 right-3 cursor-pointer text-gray-500"
          onClick={() => setShowNewPassword((prev) => !prev)}
        >
          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="mb-6 relative">
        <label className="block mb-2 text-gray-700">Confirm New Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded-md pr-10"
          placeholder="Confirm new password"
        />
        <span
          className="absolute top-14 right-3 cursor-pointer text-gray-500"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button
        onClick={handleChangePassword}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Change Password
      </button>
      <div className="text-right text-2xl mb-4">
        <button
          onClick={handleForgotPassword}
          className="text-blue-500   hover:underline"
          type="button"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordSection;
