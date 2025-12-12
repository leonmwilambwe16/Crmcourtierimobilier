import { Message } from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text, attachment } = req.body;
    const msg = await Message.create({ senderId: req.user.id, receiverId, text, attachment });
    res.json({ message: "Message sent", msg });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConversations = async (req, res) => {
  const userId = req.params.userId;
  const messages = await Message.find({ $or: [{ senderId: userId }, { receiverId: userId }] });
  res.json(messages);
};
