import { Router } from 'express';
import { errorHandler, healthCheck, notFound } from '../controllers';
import contactRouter from './contact.routes';

const router = Router();

router.get('/health', healthCheck);

router.use('/', contactRouter);

router.all('*', notFound);

router.use(errorHandler);

export default router;
