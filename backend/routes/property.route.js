import express from 'express';
import { createProperty, getCourtierProperties, getMyProperties } from '../controllers/property.controller.js';
import authMiddlewear from '../middlewears/auth.middlewear.js';
import { allowRoles } from '../middlewears/roles.middlewear.js';

const propertyRouter = express.Router(); 


propertyRouter.post('/',authMiddlewear,allowRoles('COURTIER'),createProperty);
propertyRouter.get('/my-propertys',authMiddlewear,allowRoles('CLIENT'),getMyProperties);
propertyRouter.get('/courtier',authMiddlewear,allowRoles('COURTIER'),getCourtierProperties);

export default propertyRouter;