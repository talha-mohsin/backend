import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/signupSchema.js";

export const signupController = async (req, res) => {
  try {
    const body = req.body;
    const userExist = await UserModel.findOne({ email: body.email });

    if (userExist) {
      return res.json({
        status: false,
        message: `This email is already exist`,
      });
    }

    const hashPass = await bcrypt.hash(body.password, 10);
    const response = await UserModel.create({ ...body, password: hashPass });

    res.json({
      status: true,
      message: "User Signup Successfully",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        status: false,
        message: "email or password invalid",
      });
    }

    // <<< ------------- JSON Web Token (JWT) -------------- >>>
    const data = { _id: user._id };
    const token = jwt.sign(data, "BATCH2", {
      expiresIn: "24h",
    });

    console.log("token", token);
    // <<< ------------- EndJSON Web Token (JWT) -------------- >>>

    const passCompared = await bcrypt.compare(password, user.password);

    if (!passCompared) {
      return res.json({
        status: false,
        message: "email or password invalid",
      });
    }

    res.json({
      status: true,
      message: "user login successfull",
      token
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message || "Something went wrong",
    });
  }
};
