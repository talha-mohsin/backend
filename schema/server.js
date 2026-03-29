import express from "express";
import User from "./UserSchema.js";
import mongoose from "mongoose";
import dns from 'node:dns'
dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  const URI = `mongodb+srv://admin:admin123@cluster0.g47u9ur.mongodb.net/?appName=Cluster0`;
  await mongoose.connect(URI);
  console.log("MongoDB Connected");
} catch (error) {
  console.log(`MongoDB Error ${error.message}`);
}

app.post("/user", async (req, res) => {
  try {
    const response = await User.create(req.body);
    console.log("response ==>>", response);

    res.json({
      status: true,
      message: "User Created",
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      status: false,
      message: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
