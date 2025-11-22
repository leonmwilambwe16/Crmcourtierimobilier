import express from 'express';
import { getConversations, sendMessage } from '../controllers/message.controller.js';
import authMiddlewear from '../middlewears/auth.middlewear.js';

const messageRouter = express.Router();

messageRouter.post('/send',authMiddlewear,sendMessage);
messageRouter.get('/conversations/:userId',authMiddlewear,getConversations);

export default messageRouter;