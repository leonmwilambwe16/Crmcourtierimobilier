import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["CLIENT", "COURTIER", "ADMIN"], default: "CLIENT" },
  profilePicture: { type: String, default: "" },
  assignedCourtier: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
