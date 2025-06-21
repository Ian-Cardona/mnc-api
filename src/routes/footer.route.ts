import express from 'express';
import footerController from '../controllers/footer.controller';
import { validate } from '../middleware/validate.middleware';
import footerZodSchema from '../validations/footer.validation';

const router = express.Router();

router.get('/', validate(footerZodSchema) ,footerController.fetchFooter);

export default router;