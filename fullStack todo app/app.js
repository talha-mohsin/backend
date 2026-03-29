import express from "express";
import mongoose from "mongoose";
import UserModal from "./models/userSchema.js";
import cors from "cors"

const app = express();
const PORT = 5000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors())

const URI =
  "mongodb+srv://admin:admin432@cluster0.4dxg052.mongodb.net/?appName=Cluster0";

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error", err.message);
  });

// STARTING TASK APIs 
// create task
app.post("/task", async (req, res) => {
  try {
    const response = await UserModal.create(req.body);

    res.json({
      status: true,
      message: "Task Created",
      data: response,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message || "something went wrong",
      data: null,
    });
  }
});

// read task
app.get("/task", async (req, res) => {
  try {
    const response = await UserModal.find();

    res.json({
      status: true,
      message: "All Tasks",
      data: response,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message || "something went wrong",
      data: null,
    });
  }
});

// update task
app.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UserModal.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      status: true,
      message: "User Updated",
      data: response,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message || "Something went wrong",
    });
  }
});

// delete task
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UserModal.findByIdAndDelete(id);

    res.json({
      status: true,
      message: "task deleted",
      data: null,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
});
// ENDING TASK APIs 

// Server
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
