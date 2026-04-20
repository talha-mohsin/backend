import React, { useEffect, useState } from "react";
import SignupApi from "../authapi/SignupApi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const fetchingData = async () => {
    console.log(name, email, password);
    const user = await SignupApi({ username: name, email, password });
    console.log("user =>>", user);
    if (user.status) {
      setStatus("success");
      setMessage(user.message + ", Check your email for verification");
    } else {
      setStatus("error");
      setMessage(user.message + ", Try again");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* ✅ Status Message */}
        {status && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded-lg text-start
            ${status === "success" && "bg-green-100 text-green-700"}
            ${status === "error" && "bg-red-100 text-red-700"}
            ${status === "loading" && "bg-blue-100 text-blue-700"}
            `}
          >
            {status === "loading" ? "Processing..." : message}
          </div>
        )}

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-start text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-start text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            onClick={fetchingData}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 ml-1 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
