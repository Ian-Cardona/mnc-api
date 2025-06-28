import { Router } from 'express';
import { validate } from '../middleware/validate.middleware';
import servicesController from '../controllers/services.controller';
import servicesZodSchema from '../validations/services.validation';

const router = Router();

router.get('/', servicesController.fetchServices);

router.post('/', validate(servicesZodSchema), servicesController.createServices);

router.put('/', validate(servicesZodSchema), servicesController.updateServices);

export default router;
