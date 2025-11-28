import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './lib/db.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import propertyRouter from './routes/property.route.js';
import messageRouter from './routes/message.route.js';
import dossierRouter from './routes/dossier.route.js';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5174',
  methods:['GET','POST','PUT','DELETE'],
  credentials:true
}));

const PORT  = process.env.PORT || 6080; 

app.use('/api/auth',authRouter);
app.use('/api/property',propertyRouter);
app.use('/api/message',messageRouter);
app.use('/api/dossier',dossierRouter);

app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
});