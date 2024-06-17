import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewedUserId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    reviews: {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      stars: { type: Number, required: true },
      text: { type: String, required: true },
    },
  },
  { collection: "reviews", timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
