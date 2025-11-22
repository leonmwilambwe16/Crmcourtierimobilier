import express from 'express';
import { login, logout, registerClient, registerCourtier } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/register-client",registerClient);
authRouter.post("/register-courtier",registerCourtier);
authRouter.post("/login",login);
authRouter.post("/logout",logout);

export default authRouter;