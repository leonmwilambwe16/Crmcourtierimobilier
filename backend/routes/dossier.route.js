import express from 'express';
import { getMyDossiers, updateDossier } from '../controllers/dossier.controller.js';
import authMiddlewear from '../middlewears/auth.middlewear.js';
import { allowRoles } from '../middlewears/roles.middlewear.js';


const dossierRouter = express.Router();

dossierRouter.post('/update/:clientId',authMiddlewear,allowRoles("COURTIER"),updateDossier);
dossierRouter.get('/mine',authMiddlewear,allowRoles("CLIENT"),getMyDossiers);

export default dossierRouter;