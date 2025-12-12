import mongoose from "mongoose";

const DossierSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courtierId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  files: [String], 
}, { timestamps: true });

export const Dossier = mongoose.model("Dossier", DossierSchema);
