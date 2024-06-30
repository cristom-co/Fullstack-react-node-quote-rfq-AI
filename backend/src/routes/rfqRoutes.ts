import { Router } from 'express';
import { handleRfq, handleQoutes } from '../controllers/rfqController';

const router = Router();

router.post('/', handleRfq);
router.get('/list-qoutes', handleQoutes);

export default router;
