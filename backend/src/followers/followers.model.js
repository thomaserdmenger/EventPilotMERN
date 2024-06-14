import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
  {
    isFollowingId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFollowedId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "followers", timestamps: true }
);

export const Follower = mongoose.model("Follower", followerSchema);
