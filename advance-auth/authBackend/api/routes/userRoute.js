import express from "express";
import {
  changePassword,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  verification,
  verifyOTP,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { userSchema, validateUser } from "../validators/userValidate.js";

const router = express.Router();

router.post("/register", validateUser(userSchema), registerUser);
router.post("/verify", verification);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOTP);
router.post("/change-password/:email", changePassword);

// for vercel
router.get("/getRoughData", (req, res) => {
  try {
    res.json({
      status: true,
      message: "Your Api is working well",
    });
  } catch (error) {
    res.json({
      status: true,
      message: error.message || "Something went wrong",
    });
  }
});

export default router;
