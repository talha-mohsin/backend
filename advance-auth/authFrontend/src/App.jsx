import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import VerifyMail from "./pages/VerifyMail";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";


function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/verify/:token" element={<VerifyMail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verify-otp/:email" element={<VerifyOTP />} />
          <Route path="/changePassword/:email" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App