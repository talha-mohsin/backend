const SignupApi = async (data) => {
  console.log("data ==>>", data);
  const res = await fetch("http://localhost:8000/user/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  console.log("result =>>", result);
  return result;
};

export default SignupApi;
