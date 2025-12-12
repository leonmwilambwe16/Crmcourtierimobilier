import express from 'express';
import authMiddlewear from "../middlewears/auth.middlewear.js";
import { login, logout, registerClient, registerCourtier, updateRole } from '../controllers/auth.controller.js';
import { allowRoles } from '../middlewears/roles.middlewear.js';

 
const authRouter = express.Router();

authRouter.post("/register-client",registerClient);
authRouter.post("/register-courtier",registerCourtier);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.put("/update-role",authMiddlewear, allowRoles("ADMIN"), updateRole)

export default authRouter;