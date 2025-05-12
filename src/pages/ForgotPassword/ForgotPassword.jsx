import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../../providers/AppProviders";

const ForgotPassword = () => {
  const { BASE_URL } = useProductStore();
  const [step, setStep] = useState(1);
  const [input, setInput] = useState(""); // Email or phone
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();

  // Load saved input on mount
  useEffect(() => {
    const saved = localStorage.getItem("fp-user");
    if (saved) setInput(saved);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [step, timer]);

  const isValidEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const isValidCode = (value) => /^\d{6}$/.test(value);
  const isValidPassword = (value) => value.length >= 8;

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    if (!isValidEmailOrPhone(input)) {
      setError("Please enter a valid email or phone number.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/otp/send`, {
        email_or_phone: input,
      });

      if (res.data.status && res.status) {
        setMessage("Verification code sent.");
        setCodeSent(true);
        localStorage.setItem("fp-user", input);
        setStep(2);
        setTimer(120);
      } else {
        setError("Failed to send code.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    const storedInput = localStorage.getItem("fp-user");
    if (!storedInput || !isValidCode(code)) {
      setError("Enter a valid 6-digit code.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/otp/verify`, {
        email_or_phone: storedInput,
        token: code,
      });

      if (res.status) {
        setMessage("Code verified. Set your new password.");
        setCodeVerified(true);
        setStep(3);
      } else {
        setError("Invalid code.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    const storedInput = localStorage.getItem("fp-user");
    if (!storedInput || !codeVerified) {
      setError("Verification required. Restart the process.");
      setIsLoading(false);
      return;
    }

    if (!password || !repeatPassword) {
      setError("Fill both password fields.");
      setIsLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/password/reset`, {
        email_or_phone: storedInput,
        token: code,
        password: password,
        password_confirmation: repeatPassword,
      });

      if (res.status) {
        setMessage("Password reset successful. Redirecting to login...");
        localStorage.removeItem("fp-user");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="max-w-[1400px] mx-auto py-14 flex flex-col items-center gap-10">
        <h1 className="text-xl md:text-3xl font-semibold text-red-400">
          Forgot Password
        </h1>
        <div className="w-[80%] md:w-[40%] bg-white rounded-lg shadow-md p-8">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Enter Email or Phone
              </h2>
              <form
                onSubmit={handleSendCode}
                className="flex flex-col gap-4 text-2xl"
              >
                <input
                  type="text"
                  placeholder="Email or Phone"
                  className="px-4 py-2  border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    localStorage.setItem("fp-user", e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg text-white ${
                    isLoading || !isValidEmailOrPhone(input)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-400 hover:bg-red-500"
                  }`}
                  disabled={isLoading || !isValidEmailOrPhone(input)}
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Enter Verification Code
              </h2>
              <form
                onSubmit={handleVerifyCode}
                className="flex flex-col text-2xl gap-4"
              >
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter 6-digit code"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setCode(value);
                  }}
                />
                {timer > 0 ? (
                  <div className="text-xl text-gray-600">
                    Time remaining: {formatTime(timer)}
                  </div>
                ) : (
                  <div className="text-sm text-red-500">
                    Code expired. Please request a new one.
                  </div>
                )}
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg text-white ${
                    isLoading || !isValidCode(code) || timer <= 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-400 hover:bg-red-500"
                  }`}
                  disabled={isLoading || !isValidCode(code) || timer <= 0}
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </button>
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="text-xl text-indigo-500 hover:underline"
                  disabled={timer > 0}
                >
                  Resend Code
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Reset Your Password
              </h2>
              <form
                onSubmit={handleResetPassword}
                className="flex flex-col gap-4 text-2xl"
              >
                <input
                  type="password"
                  placeholder="New Password (min 8 characters)"
                  className="px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-indigo-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Repeat New Password"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg text-white ${
                    isLoading ||
                    !isValidPassword(password) ||
                    password !== repeatPassword
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-400 hover:bg-red-500"
                  }`}
                  disabled={
                    isLoading ||
                    !isValidPassword(password) ||
                    password !== repeatPassword
                  }
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {message && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}

          <div className="mt-6 text-xl text-gray-500 text-center">
            Remembered your password?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
