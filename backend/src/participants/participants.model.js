import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    eventId: { type: mongoose.Types.ObjectId, ref: "Event", required: true },
  },
  { collection: "participants", timestamps: true }
);

export const Participant = mongoose.model("Participant", participantSchema);
