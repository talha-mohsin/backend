const LogoutApi = async () => {
  const res = await fetch("http://localhost:8000/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return res;
};

export default LogoutApi;
