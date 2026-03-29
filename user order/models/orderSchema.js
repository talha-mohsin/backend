import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: String,
    product: String,
    desc: String,
    price: Number,
  },
  {
    timestamps: true,
  },
);

const orderModel = mongoose.model("User", orderSchema);

export default orderModel;
