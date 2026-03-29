import { useState } from "react";
import changePassword from "../authapi/ChangePassword";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const data = useParams();
  const navigate = useNavigate()

  async function passwordHandler() {
    if (password !== conPassword) {
      return alert("Password and Confirm Password must be similar!");
    }

    if (password.length < 8) {
      return alert("Password must be 8 characters long!");
    }

    const res = await changePassword(data.email, {newPassword: password, confirmPassword: conPassword});
    console.log("res ==>>>>", res);

    alert(res.message)
    if(res.success) {
        navigate('/login')
    }
  }
  return (
    <div>
      <h1>ChangePassword</h1>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        onChange={(e) => setConPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <button onClick={passwordHandler}>Enter</button>
    </div>
  );
};

export default ChangePassword;
