import { Dossier } from "../models/Dossier.js";
import cloudinary from "../lib/Cloudinary.js";

export const getMyDossiers = async (req, res) => {
  const dossiers = await Dossier.find({ clientId: req.user.id });
  res.json(dossiers);
};

export const updateDossier = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { files } = req.body; // array of base64 or URL
    const uploadedFiles = [];

    for (let file of files) {
      const uploaded = await cloudinary.uploader.upload(file, { folder: "dossiers" });
      uploadedFiles.push(uploaded.secure_url);
    }

    let dossier = await Dossier.findOne({ clientId });
    if (!dossier) {
      dossier = await Dossier.create({ clientId, files: uploadedFiles });
    } else {
      dossier.files.push(...uploadedFiles);
      await dossier.save();
    }

    res.json({ message: "Dossier updated", dossier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
