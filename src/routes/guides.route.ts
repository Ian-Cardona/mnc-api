import express from 'express';
import guidesController from '../controllers/guides.controller';
import { validate } from '../middleware/validate.middleware';
import guidesZodSchema from '../validations/guides.validation';

const router = express.Router();

router.get('/', guidesController.fetchGuides);

router.post('/', validate(guidesZodSchema), guidesController.createGuides);

router.put('/', validate(guidesZodSchema), guidesController.updateGuides);

export default router;
