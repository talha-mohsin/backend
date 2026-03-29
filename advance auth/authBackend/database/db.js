import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/note-app`);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`MongoDB Error`, error.message);
  }
};

export default connectDB