import { Router } from 'express';
import navbarController from '../controllers/navbar.controller';
import { validate } from '../middleware/validate.middleware';
import navbarZodSchema from '../validations/navbar.validation';

const router = Router();

router.get('/', navbarController.fetchNavBar);

router.post('/', validate(navbarZodSchema), navbarController.createNavBar);

router.put('/', validate(navbarZodSchema), navbarController.updateNavBar);

export default router;
