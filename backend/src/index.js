import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cloudinary from "cloudinary";

const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

await mongoose.connect(process.env.MONGODB_URI, { dbName: "EventPilot" });
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listens on port: ${PORT}`));
