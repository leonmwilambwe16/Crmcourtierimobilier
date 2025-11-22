import { Property } from "../models/Property.models.js";

export const createProperty = async(req,res)=>{
 try {
  const {title,price,address,description,clientId} = req.body;
  const property = await Property.create({
    title,
    price,
    address,
    description,
    clientId,
    courtierId:req.user.id
  });
  res.status(201).json({message:"Property created successfully",property});
 } catch (error) {
  res.status(500).json({message:"Error creating property",error:error.message});
 }
}

export const getMyProperties = async (req,res)=>{
  try {
    const properties = await Property.find({
      clientId:req.user.id,
      courtierId: req.query.courtierId
    })
    res.status(200).json({message:"Last property fetched successfully", properties})
  } catch (error) {
    res.status(500).json({message:"Error fetching properties", error: error.message})
  }
}

export const getCourtierProperties = async (req,res)=>{
  try {
    const properties = await Property.find({courtierId:req.user.id});
    res.status(200).json({message:"Courtier properties fetched successfully ", properties})

  } catch (error) {
   res.status(500).json({message:"Error fetching courtier properties", error: error.message});
  }
}