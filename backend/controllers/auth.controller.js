import { User } from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


export const registerClient =  async(req,res)=>{
 try {
  const {firstName,lastName,email,password} = req.body;
   if(!firstName || !lastName || !email || !password){
    return res.status(400).json({ message: "User already exists" });
   }
  const existingUser = await User.findOne({email});
  if(existingUser) return res.status(400).json({message:"User already exists"});
  const hashed =  await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password:hashed,
    role:"CLIENT"
  });
  res.status(201).json({message:"Client registered successfully",user })
 } catch (error) {
  res.status(500).json({error:error.message})
 }
}
export const registerCourtier = async(req,res)=>{
 try {
  const {firstName,lastName,email,password} = req.body;
  const existingUser= await User.findOne({email});
  if(existingUser) return res.status(400).json({message:'Courtier already exists'});
  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password:hashed,
    role:"COURTIER",
  })
  res.status(201).json({message:"Courtier registered successfully",user })
 } catch (error) {
  res.status(500).json({error:error.message})
 }
}

export const login = async(req,res)=>{
 try {
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({message:"Login user Not Found"});
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return res.status(400).json({message:"Bad password"});
  const token = jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'});
  res.cookie('token',token,{
    httpOnly:true,
    secure:true,
    sameSite: 'none',
  })
  res.json({message:"Logged in successfully",user:{
    id:user._id,
    role:user.role,
    email:user.email,
  }})
 } catch (error) {
  res.status(500).json({error:error.message})
 }
}
export const logout = (req,res)=>{
  res.clearCookie('token',{
    httpOnly:true,
    secure:true,
    sameSite: 'none',
  });
  res.send("user logged out ")
}