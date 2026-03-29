import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Set cookie
app.get("/", (req, res) => {
  res.cookie("Token", "fidriueirjadjfkjadklfjasdpiofujkfklja44u43jf0d_fjdl");
  res.send("done");
});

// Get cookie
app.get("/read", (req, res) => {
  console.log("cookies", req.cookies);
  res.send("Read Page");
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
