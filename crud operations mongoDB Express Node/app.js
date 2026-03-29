import express from "express";
import mongoose from "mongoose";
import UserModal from "./models/userSchema.js";

const app = express();
const PORT = 5000;

const URI =
  "mongodb+srv://muhammadtalhamohsin_db_user:YinI2vUeW5CAM5Eq@cluster0.tvlliki.mongodb.net/?appName=Cluster0";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Mongoose for Schema in MongoDB
mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDV Error", err.message);
  });

// Create User
app.post("/createUser", async (req, res) => {
  console.log(req.body);
  try {
    const userResponse = await UserModal.create(req.body);
    console.log(userResponse);

    res.json({
      message: "User Created!",
      data: userResponse,
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      message: error.message || "Something went wrong",
      data: null,
    });
  }
});

// Read All Users
app.get("/getAllUsers", async (req, res) => {
  try {
    const userResponse = await UserModal.find();

    res.json({
      message: "Get All Users!",
      data: userResponse,
    });
  } catch (error) {
    console.log(error.message);

    res.json({
      message: error.message || "Something went wrong",
      data: null,
    });
  }
});

// Read Specific first user
app.get("/getUser", async (req, res) => {
  const response = await UserModal.findOne({ name: "Ahmed Raza" });

  res.json({
    message: "Single User",
    data: response,
  });
});

// Read Specific user by id
app.get("/getUser/:id", async (req, res) => {
  const userId = req.params.id;
  const response = await UserModal.findById(userId);

  res.json({
    message: "Single User",
    data: response,
  });
});

// Update User
app.put("/updateUser/:id", async (req, res) => {
  const { id: userId } = req.params;
  const body = req.body;

  const response = await UserModal.findByIdAndUpdate(userId, body, {
    new: true,
  });

  res.json({
    message: "User updated",
    data: response,
  });
});

// Delete User
app.delete("/deleteUser/:id", async (req, res) => {
  const userId = req.params.id;

  const response = await UserModal.findByIdAndDelete(userId);

  res.json({
    message: "User Deleted",
    data: null
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
