import express from 'express';
import { getFooter } from '../controllers/footer.controller';

const router = express.Router();

// TODO: Implement actual CRUD
router.get('/', getFooter);

export default router;