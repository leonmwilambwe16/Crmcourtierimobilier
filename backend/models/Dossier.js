import mongoose from "mongoose"; 

const  DossierSchema= new mongoose.Schema({
  clientId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  courtierId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  status: {
    type:String,
    enum:["PENDING","IN_PROGRESS","COMPLETED","CANCELLED"],
    default:"PENDING",
  },
  documents:Array,
},{timestamps:true});

export const Dossier = mongoose.model("Dossier", DossierSchema);