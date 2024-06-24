import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cloudinary from "cloudinary";
import { userRouter } from "./users/users.routes.js";
import { eventRouter } from "./events/events.routes.js";
import { bookmarkRouter } from "./bookmarks/bookmarks.routes.js";
import { followerRouter } from "./followers/followers.routes.js";
import { participantRouter } from "./eventRegistration/eventRegistration.routes.js";
import { reviewsRouter } from "./reviews/reviews.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);
app.use("/api/v1/eventRegistration", participantRouter);
app.use("/api/v1/followers", followerRouter);
app.use("/api/v1/reviews", reviewsRouter);

await mongoose.connect(process.env.MONGODB_URI, { dbName: "EventPilot" });
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listens on port: ${PORT}`));
