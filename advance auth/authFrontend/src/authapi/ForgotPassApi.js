const ForgotPassApi = async (email) => {
  console.log("email ===>>>>", email);
  const res = await fetch("http://localhost:8000/user/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const result = await res.json();
  console.log(result);
  return result;
};

export default ForgotPassApi;
