import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import LoginImg from "../../assets/imgs/login.jpg";
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { BASE_URL, setUserData } = useProductStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value) => {
    if (!value) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid.";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required.";
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailError = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: emailError }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordError = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: passwordError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      setIsLoading(true); // Set loading state to true during API call

      try {
        const response = await fetch(`${BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Login failed ❌:", result);
          alert(result.message || "Login failed!");
          setIsLoading(false); // Reset loading state
          return;
        }
        console.log(result, "login-result");
        const userData = {
          message: result.message || "Login successful!",
          token: result.token,
          user: {
            username: result.user.username,
            email: result.user.email,
            phone: result.user.phone_number,
          },
        };

        // Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        // Set user data globally (AppContext)
        setUserData(userData);

        // Navigate to dashboard or home page
        // navigate("/dashboard");

        // Clear the form fields after successful login
        setEmail("");
        setPassword("");

        setIsLoading(false); // Reset loading state
      } catch (error) {
        console.error("Error during login ❌:", error);
        alert("Something went wrong during login! Try again later.");
        setIsLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div className="login_content xl:min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex items-center justify-center p-8">
      <div className="login_form my-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden flex items-center flex-col md:flex-row xl:h-[60vh] xl:max-h-[800px]">
        {/* Left Image */}
        <div className="hidden md:flex md:w-1/2 h-full overflow-hidden bg-gray-100">
          <img
            src={LoginImg}
            alt="Login visual"
            className="w-full h-full object-contain object-center"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-12 space-y-8 flex flex-col justify-center">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-2xl text-gray-500">
              Please login to your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <FiMail className="absolute top-5 left-4 text-gray-400 text-2xl" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="w-full pl-12 pr-4 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <div className="min-h-[20px]">
                {errors.email && (
                  <p className="text-red-400 text-xl mt-1 ml-2">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <FiLock className="absolute top-5 left-4 text-gray-400 text-2xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full pl-12 pr-12 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <div
                className="absolute top-4 right-4 text-gray-400 text-2xl cursor-pointer hover:text-gray-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </div>
              <div className="min-h-[20px]">
                {errors.password && (
                  <p className="text-red-500 text-xl mt-1 ml-2">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!email || !password}
              className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg text-2xl shadow-md transition duration-200 ${
                !email || !password
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 text-2xl mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
