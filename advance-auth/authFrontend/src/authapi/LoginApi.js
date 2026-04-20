const LoginApi = async (data) => {
  const res = await fetch("http://localhost:8000/user/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export default LoginApi;