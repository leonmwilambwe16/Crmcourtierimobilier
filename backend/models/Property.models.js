import mongoose from "mongoose"; 

const PropertySchema = new mongoose.Schema({
  title:String,
  price:Number,
  address:String,
  description:String,
  clientId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  courtierId: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
},{timestamps:true});

export  const Property = mongoose.model("Property",PropertySchema)