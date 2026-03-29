import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product: String,
    desc: String,
    price: Number,
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model('User', productSchema)

export default ProductModel