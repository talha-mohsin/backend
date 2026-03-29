import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/index.js";
import dotenv from "dotenv";

// dotenv config
dotenv.config(); 

console.log(process.env.NAME);

const app = express();
const PORT = process.env.PORT || 5000;

// Body Parser
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`MongoDB Connected`);
  })
  .catch((err) => {
    console.log(`MongoDB Error`, err.message);
  });

app.use(route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
