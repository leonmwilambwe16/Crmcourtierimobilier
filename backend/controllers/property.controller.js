import { Property } from "../models/Property.models.js";
import cloudinary from "../lib/Cloudinary.js";

export const createProperty = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    let imageUrl = "";
    if (image) {
      const uploaded = await cloudinary.uploader.upload(image, { folder: "properties" });
      imageUrl = uploaded.secure_url;
    }
    const property = await Property.create({ title, description, image: imageUrl, courtierId: req.user.id });
    res.status(201).json({ message: "Property created", property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourtierProperties = async (req, res) => {
  const properties = await Property.find({ courtierId: req.user.id });
  res.json(properties);
};

export const getMyProperties = async (req, res) => {
  const user = req.user;
  const properties = await Property.find({ courtierId: user.assignedCourtier });
  res.json(properties);
};
