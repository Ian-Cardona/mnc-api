import express from 'express';
import footerController from '../controllers/footer.controller';

const router = express.Router();

router.get('/', footerController.fetchFooter);

export default router;