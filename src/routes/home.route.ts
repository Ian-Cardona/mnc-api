import express from 'express';
import { getHome } from '../controllers/home.controller';

const router = express.Router();

// TODO: Implement actual CRUD
router.get('/', getHome);

export default router;