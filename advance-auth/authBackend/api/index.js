import express, { urlencoded } from "express";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dns from "node:dns";
import serverless from "serverless-http";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || "5000";

connectDB();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/user", userRoute);

// http:localhost:8000/user/register

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });

export default serverless(app);