import express from 'express';
import footerController from '../controllers/footer.controller';
import { validate } from '../middleware/validate.middleware';
import footerZodSchema from '../validations/footer.validation';

const router = express.Router();

router.get('/' ,footerController.fetchFooter);

router.post('/', validate(footerZodSchema) ,footerController.createFooter);

router.put('/', validate(footerZodSchema) ,footerController.updateFooter);

export default router;
