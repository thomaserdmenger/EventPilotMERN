import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followedUserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "followers", timestamps: true }
);

export const Follower = mongoose.model("Follower", followerSchema);
