const changePassword = async (email, passwords) => {
  console.log("email ===>>>>", email);
  const res = await fetch(`http://localhost:8000/user/change-password/${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwords),
  });
  const result = await res.json();
  console.log(result);
  return result;
};

export default changePassword;
