import { Router } from 'express';
import { handleRfq } from '../controllers/rfqController';

const router = Router();

router.post('/', handleRfq);

export default router;
