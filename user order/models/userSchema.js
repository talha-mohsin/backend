import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model('User', userSchema)

export default UserModel