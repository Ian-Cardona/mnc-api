import express from 'express';
import { getFooter } from '../controllers/footer.controller';

const router = express.Router();

router.get('/', getFooter);

export default router;