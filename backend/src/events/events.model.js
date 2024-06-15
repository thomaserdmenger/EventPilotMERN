import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    dates: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    // dates: { type: String, required: true }, // weil in Thunderclient als ein string weitergegeben wird - wie läuft es übers Frontend  mit Icaros UI?
    location: { type: String, required: true },
    // categories: [{ type: String, required: true }],
    description: { type: String, required: true },
    eventImage: { type: String }, // default: Profil-Bild ergänzen
  },
  { collection: "events", timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
