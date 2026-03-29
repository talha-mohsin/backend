import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VerifyUserMail from "../authapi/VerifyMailApi";

const VerifyMail = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  const token = useParams().token;

  async function userVerification() {
    const res = await VerifyUserMail(token);
    if (res.success === true) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  useEffect(() => {
    userVerification();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
          {/* Loader */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verifying your email...
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Please wait while we confirm your account.
          </p>

          {/* Optional Message */}
          <div className="bg-blue-50 text-blue-700 py-2 px-4 rounded-lg text-sm">
            This may take a few seconds.
          </div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
              <span className="text-green-600 text-2xl">✔</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Email Verified!
          </h2>

          <p className="text-gray-600 mb-6">
            Your account has been successfully verified.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
              <span className="text-red-600 text-2xl">✖</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verification Failed
          </h2>

          <p className="text-gray-600 mb-6">The link is invalid or expired.</p>

          <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200">
            Try Again
          </button>
        </div>
      </div>
    );
  }
};

export default VerifyMail;
