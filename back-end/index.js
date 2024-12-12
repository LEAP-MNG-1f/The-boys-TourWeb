import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";
import mongoose from "mongoose";
import tourRouter from "./routes/TourRouter.js";
import categoryRouter from "./routes/CategoryRouter.js";
import orderRouter from "./routes/OrderRouter.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = express();
const PORT = 8000;
server.use(cors());
server.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

server.use("/api", tourRouter);
server.use("/api", categoryRouter);
server.use("/api", orderRouter);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
