import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  attachment: { type: String, default: "" }
}, { timestamps: true });

export const Message = mongoose.model("Message", MessageSchema);
