import express from "express";
import { loginController, signupController } from "../controller/auth.js";
import { authMiddleware } from "../middleware/auth.js";
import { welcomeEmail } from "../controller/email.js";
const route = express.Router();

// Create Signup User
route.post("/signup", signupController);

// Create Login User
route.post("/login", authMiddleware, loginController);

route.post("/welcome-email", welcomeEmail);

export default route;