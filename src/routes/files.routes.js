import { Router } from 'express';
import { filesController } from '../controllers/files.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
import { authMiddleware, authOrServiceMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Route publique (lecture)
router.get('/:id', filesController.serve);

// Routes protégées
router.post('/upload', authOrServiceMiddleware, upload.single('image'), filesController.upload);
router.delete('/:id', authOrServiceMiddleware, filesController.delete);

export default router;