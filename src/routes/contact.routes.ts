import { Router } from 'express';
import { identifyContact } from '../controllers';

const contactRouter = Router();

contactRouter.post('/identify', identifyContact);

export default contactRouter;
