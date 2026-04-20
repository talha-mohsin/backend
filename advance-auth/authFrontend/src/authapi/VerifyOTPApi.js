const VerifyOTPApi = async (email, otp) => {

  console.log("email", email);
  const res = await fetch(`http://localhost:8000/user/verify-otp/${email}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({otp}),
  });
  const result = await res.json();
  console.log("result =>>", result);

  return result; 
}

export default VerifyOTPApi