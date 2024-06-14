import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    eventId: { type: mongoose.Types.ObjectId, ref: "Event", required: true },
  },
  { collection: "bookmarks", timestamps: true }
);

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
