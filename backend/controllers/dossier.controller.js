import { Dossier } from "../models/Dossier.js";

export const updateDossier = async (req,res)=>{
  try {
    const {clientId} = req.params;
    const data = req.body;
    const dossier = await Dossier.findOneAndUpdate({clientId},
      {
        ...data,
        clientId,
        courtierId: req.user.id
      },
      {new:true,upsert:true}
    );
    res.status(201).json({message:"Dossier Updated successfully",dossier})
  } catch (error) {
    res.status(500).json({messgae:"Error while updating Dossier", error:error.message})
  }
}

export const getMyDossiers = async(req,res)=>{
try {
  const dossier = await  Dossier.findOne({clientId:req.user.id});
  res.status(201).json({message:"Dossier fetched successfully",dossier})
} catch (error) {
  res.status(500).json({message:"Error while fetching Dossier",error:error.message})
}
}