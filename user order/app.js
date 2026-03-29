import express, { urlencoded } from "express";
import mongoose from "mongoose";
import UserModel from "./models/userSchema.js";
import ProductModel from "./models/productSchema.js";
import ProductModel from "./models/orderSchema.js";

const app = express();
const PORT = 5000;

// BODY PARSER/MIDDLEWARE
app.use(express.json());
app.use(urlencoded({ extended: true }));

const URI = `mongodb+srv://muhammadtalhamohsin_db_user:YinI2vUeW5CAM5Eq@cluster0.tvlliki.mongodb.net/?appName=Cluster0`;

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error", err.message);
  });

// Creating User 
app.post("/user", async (req, res) => {
  const body = req.body;
  const res = await UserModel.create(body)

  res.json({
    status: true,
    message: 'User Created'
  })
});

// Creating Product 
app.post("/product", async (req, res) => {
  const body = req.body;
  const res = await ProductModel.create(body)

  res.json({
    status: true,
    message: 'Product Created'
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
