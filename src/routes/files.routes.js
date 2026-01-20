import { Router } from 'express';
import { filesController } from '../controllers/files.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = Router();

router.post('/upload', upload.single('image'), filesController.upload);
router.delete('/:id', filesController.delete);
router.get('/:id', filesController.serve);

export default router;