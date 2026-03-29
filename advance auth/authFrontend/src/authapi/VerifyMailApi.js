const VerifyUserMail = async (authToken) => {
  console.log("authToken ==>>", authToken);
  const res = await fetch("http://localhost:8000/user/verify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  console.log("result =>>", result);
  return result;
};

export default VerifyUserMail;
