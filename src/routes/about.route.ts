import express from 'express';
import aboutController from '../controllers/about.controller';
import { validate } from '../middleware/validate.middleware';
import aboutZodSchema from '../validations/about.validation';

const router = express.Router();

router.get('/', aboutController.fetchAbout);
router.post('/', validate(aboutZodSchema), aboutController.createAbout);
router.put('/', validate(aboutZodSchema), aboutController.updateAbout);

export default router;
