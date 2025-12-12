import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: String,
  description: String,
  image: { type: String, default: "" },
  courtierId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const Property = mongoose.model("Property", PropertySchema);
