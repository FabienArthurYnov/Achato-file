import { Router } from 'express';
import { filesController } from '../controllers/files.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
import { serviceMiddleware, authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Service token requis pour TOUTES les routes
router.use(serviceMiddleware);

// Routes avec service token uniquement (lecture)
router.get('/:id', filesController.serve);

// Routes avec service token + JWT (écriture)
router.post('/upload', authMiddleware, upload.single('image'), filesController.upload);
router.delete('/:id', authMiddleware, filesController.delete);

export default router;