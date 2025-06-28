import express from 'express';
import footerController from '../controllers/footer.controller';
import { validate } from '../middleware/validate.middleware';
import footerZodSchema, { formInputZodSchema } from '../validations/footer.validation';

const router = express.Router();

router.get('/' ,footerController.fetchFooter);

router.post('/', validate(footerZodSchema) ,footerController.createFooter);

router.put('/', validate(footerZodSchema) ,footerController.updateFooter);

router.post('/email', validate(formInputZodSchema), footerController.createEmail);

export default router;
