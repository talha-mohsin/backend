import React, { useState } from "react";
import VerifyOTPApi from "../authapi/VerifyOTPApi";
import { useNavigate, useParams } from "react-router-dom";

const VerifyOTP = () => {
    const navigate = useNavigate()
  const [otp, setOtp] = useState();
  const data = useParams();
  console.log("email ===>", data.email);

  async function otpHandler() {
    console.log("otp ==>>>", otp);
    const res = await VerifyOTPApi(data.email, otp);
    alert(res.message);
    if (res.success) {
        navigate(`/changePassword/${data.email}`)
    }
  }
  return (
    <div>
      <h1>Verify your otp</h1>
      <input onChange={(e) => setOtp(e.target.value)} type="text" />
      <button onClick={otpHandler}>Submit</button>
    </div>
  );
};

export default VerifyOTP;
