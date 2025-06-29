import express from 'express';
import contactController from '../controllers/contact.controller';
import { validate } from '../middleware/validate.middleware';
import contactZodSchema from '../validations/contact.validation';

const router = express.Router();

router.get('/', contactController.fetchContact);
router.post('/', validate(contactZodSchema), contactController.createContact);
router.put('/', validate(contactZodSchema), contactController.updateContact);

export default router;
