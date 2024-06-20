import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    startDate: { type: Number, required: true }, // as timestamp
    endDate: { type: Number, required: true }, // as timestamp
    location: {
      name: { type: String },
      street: { type: String },
      streetNumber: { type: String },
      zip: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String, required: true },
      lat: { type: Number },
      lon: { type: Number },
    },
    categories: [{ type: String, required: true }],
    description: { type: String, required: true },
    eventImage: { public_id: { type: String }, secure_url: { type: String } },
  },
  { collection: "events", timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
