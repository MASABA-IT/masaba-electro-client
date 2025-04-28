import React, { useState } from "react";
import { FiUser, FiPhone, FiMail, FiLock } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import SignUpImg from "../../assets/imgs/signup.jpg"; // adjust path
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { formData, setFormData, BASE_URL, userData, setUserData } =
    useProductStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone number is required.";
    if (!/^\d{10,15}$/.test(formData.phone_number))
      newErrors.phone_number = "Phone must be 10-15 digits.";

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!formData.password_confirmation)
      newErrors.password_confirmation = "Confirm your password.";
    else if (formData.password_confirmation !== formData.password)
      newErrors.password_confirmation = "Passwords do not match.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // live validation
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await fetch(`${BASE_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.username,
            phone_number: formData.phone_number, // Keep as formData.phone_number if that's your field
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
          }),
        });

        const result = await response.json(); // 👉 first get full server response

        if (!response.ok) {
          console.error("Registration failed ❌:", result);
          alert(result.message || "Registration failed!");
          return;
        }

        const userData = {
          message: result.message || "Registration successful!",
          token: result.token, // Assumed token from server response
          user: {
            name: result.user.name,
            email: result.user.email,
            phone: result.user.phone_number,
          },
        };

        // ✅ Save userData into localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        setUserData(userData);
        // Clear form (✅ matching your actual formData structure)
        setFormData({
          name: "",
          phone_number: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        setErrors({});

        // Show server success message
        alert(result.message || "Registration successful! 🎉");

        // Navigate after success
        navigate("/dashboard");
      } catch (error) {
        console.error("Error during registration ❌:", error);
        alert("Something went wrong! Try again later.");
      }
    }
  };

  console.log(formData, "formData---------------");
  return (
    <div className="signup_content xl:min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 flex items-center justify-center p-8">
      <div className="signup_form my-10  bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden flex items-center flex-col md:flex-row xl:h-[60vh] xl:max-h-[800px]">
        {/* Left Image */}
        <div className="hidden md:flex md:w-1/2 h-full overflow-hidden bg-gray-100">
          <img
            src={SignUpImg}
            alt="Login visual"
            className="w-full h-full object-contain object-center"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-12 space-y-8 flex flex-col justify-center">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-gray-800">Create Account</h2>
            <p className="text-2xl text-gray-500">Join us today!</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="relative">
              <FiUser className="absolute top-5 left-4 text-gray-400 text-2xl" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
              <div className="min-h-[20px]">
                {errors.username && (
                  <p className="text-red-400 text-xl mt-1 ml-2">
                    {errors.username}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="relative">
              <FiPhone className="absolute top-5 left-4 text-gray-400 text-2xl" />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
              <div className="min-h-[20px]">
                {errors.phone_number && (
                  <p className="text-red-400 text-xl mt-1 ml-2">
                    {errors.phone_number}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute top-5 left-4 text-gray-400 text-2xl" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
              <div className="min-h-[20px]">
                {errors.email && (
                  <p className="text-red-400 text-xl mt-1 ml-2">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute top-5 left-4 text-gray-400 text-2xl" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
              <div
                className="absolute top-4 right-4 text-gray-400 text-2xl cursor-pointer hover:text-gray-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </div>
              <div className="min-h-[20px]">
                {errors.password && (
                  <p className="text-red-400 text-xl mt-1 ml-2">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FiLock className="absolute top-5 left-4 text-gray-400 text-2xl" />
              <input
                type={showPassword ? "text" : "password"}
                name="password_confirmation"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
              <div className="min-h-[20px]">
                {errors.password_confirmation && (
                  <p className="text-red-400 text-xl mt-1 ml-2">
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={
                !formData.username ||
                !formData.phone_number ||
                !formData.email ||
                !formData.password ||
                !formData.password_confirmation
              }
              className={`w-full bg-pink-600 text-white font-bold py-3 rounded-lg text-2xl shadow-md transition duration-200 ${
                !formData.username ||
                !formData.phone_number ||
                !formData.email ||
                !formData.password ||
                !formData.password_confirmation
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-pink-700"
              }`}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-500 text-2xl mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-600 hover:underline font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
