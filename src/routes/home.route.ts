import express from 'express';
import homeController from '../controllers/home.controller';
import { validate } from '../middleware/validate.middleware';
import homeZodSchema from '../validations/home.validation';

const router = express.Router();

router.get('/', validate(homeZodSchema), homeController.fetchHome);

export default router;