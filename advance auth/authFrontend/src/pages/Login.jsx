import React, { useState } from "react";
import LoginApi from "../authapi/LoginApi";
import { useNavigate } from "react-router-dom";
import ForgotPassApi from "../authapi/ForgotPassApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchingLoginData() {
    try {
      setStatus("loading");
      setMessage("");
      setLoading(true);

      const res = await LoginApi({ email, password });

      setLoading(false);
      if (res.accessToken) {
        setStatus("success");
        setMessage(res.message || "Login successful");
        navigate("/home");
      } else {
        setStatus("error");
        setMessage(res.message || "Login failed");
      }
    } catch (error) {
      setStatus("loading");
      setMessage("");
      setLoading(true);

      const res = await LoginApi({ email, password });

      setLoading(false);
      if (res.accessToken) {
        setStatus("success");
        setMessage(res.message || "Login successful");
        navigate("/home");
      } else {
        setStatus("error");
        setMessage(res.message || "Login failed");
      }
    }
  }

  async function forgotPassHandler() {
    if (!email) {
      setStatus("error");
      setMessage("Please enter your registered email first");
      return;
    }

    setStatus("loading");

    const res = await ForgotPassApi(email);

    if (res.success) {
      setStatus("success");
      setMessage(res.message);
      navigate(`/verify-otp/${email}`);
    } else {
      setStatus("error");
      setMessage(res.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login your Account
        </h2>

        {/* Status Message */}
        {status && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded-lg text-center
        ${status === "success" && "bg-green-100 text-green-700"}
        ${status === "error" && "bg-red-100 text-red-700"}
        ${status === "loading" && "bg-blue-100 text-blue-700"}
        `}
          >
            {status === "loading" ? "Processing..." : message}
          </div>
        )}

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-start text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-start text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {/* Forgot Password */}
            <span
              onClick={forgotPassHandler}
              className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline self-end"
            >
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            onClick={fetchingLoginData}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-dashed rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>

          {/* Signup link */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?
            <a href="/signup" className="text-blue-600 ml-1 hover:underline">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
