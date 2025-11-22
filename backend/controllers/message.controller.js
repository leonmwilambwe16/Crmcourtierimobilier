import { Message } from "../models/Message.js";

export const sendMessage = async (req,res)=>{
  try {
    const { receiver,content}= req.body;
    const msg = await Message.create({
      sender:req.user.id,
      receiver,
      content,
    });
    res.status(201).json({message:"Message created successfully",msg})
  } catch (error) {
    res.status(500).json({message:"Error while creating message",message:error.message})
  }
}

export const getConversations = async(req,res)=>{
  try {
    const {userId} = req.params;
    const messages = await Message.find({
      $or:[
        {sender:req.user.id,receiver:userId},
        {sender:userId,receiver:req.user.id}
      ],
    })
    res.status(201).json({message:"Message fetch sucessfully",messages})
  } catch (error) {
    res.status(501).json({message:"Error while fetching message",error:error.message})
  }
}