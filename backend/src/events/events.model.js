import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    startDate: { type: Number, required: true }, // as timestamp
    endDate: { type: Number, required: true }, // as timestamp
    location: { type: String, required: true },
    categories: [{ type: String, required: true }],
    description: { type: String, required: true },
    eventImage: { type: String }, // default: Profil-Bild ergänzen
  },
  { collection: "events", timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
