import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false, required: true },
    profileImg: { type: String }, // default: Profil-Bild ergänzen
    bio: { type: String, default: "Hi, I'm using EventPilot." },
    interests: [{ type: String }],
  },
  { collection: "users", timestamps: true }
);

export const User = mongoose.model("User", userSchema);
