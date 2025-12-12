import { User } from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/Cloudinary.js"

export const registerClient = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    let profileUrl = "";
    if (req.body.profilePicture) {
      const uploaded = await cloudinary.uploader.upload(req.body.profilePicture, {
        folder: "profiles",
      });
      profileUrl = uploaded.secure_url;
    }

    const user = await User.create({ firstName, lastName, email, password: hashed, role: "CLIENT", profilePicture: profileUrl });
    res.status(201).json({ message: "Client registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerCourtier = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Courtier already exists" });

    const hashed = await bcrypt.hash(password, 10);

    let profileUrl = "";
    if (req.body.profilePicture) {
      const uploaded = await cloudinary.uploader.upload(req.body.profilePicture, {
        folder: "profiles",
      });
      profileUrl = uploaded.secure_url;
    }

    const user = await User.create({ firstName, lastName, email, password: hashed, role: "COURTIER", profilePicture: profileUrl });
    res.status(201).json({ message: "Courtier registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Bad password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });

    res.json({ message: "Logged in", user: { id: user._id, role: user.role, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
  res.send("User logged out");
};

// Admin can change roles
export const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();
    res.json({ message: "Role updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
