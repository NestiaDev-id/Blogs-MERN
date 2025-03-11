import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json({ message: "Backend API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Berhasil Terhubung ke Database");
    app.listen(process.env.PORT, () => {
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Kesalahan koneksi MongoDB:", error);
  });
