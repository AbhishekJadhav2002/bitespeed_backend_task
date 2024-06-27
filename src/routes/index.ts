import { Router } from 'express';
import { errorHandler, healthCheck, notFound } from '../controllers';

const router = Router();

router.get('/health', healthCheck);

router.all('*', notFound);

router.use(errorHandler);

export default router;
