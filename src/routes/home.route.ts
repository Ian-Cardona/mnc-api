import express from 'express';
import homeController from '../controllers/home.controller';
import { validate } from '../middleware/validate.middleware';
import homeZodSchema from '../validations/home.validation';

const router = express.Router();

router.get('/', homeController.fetchHome);

router.post('/', validate(homeZodSchema), homeController.createHome);

router.put('/', validate(homeZodSchema), homeController.updateHome);

export default router;
