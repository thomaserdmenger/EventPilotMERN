import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    dates: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    location: { type: String, required: true },
    categories: [{ type: String, required: true }],
    description: { type: String, required: true },
    eventImage: { type: String }, // default: Profil-Bild ergänzen
  },
  { collection: "events", timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
