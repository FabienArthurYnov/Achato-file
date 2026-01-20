// Achato-file/src/services/files.service.js
import { unlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { imagesRepository } from '../repositories/images.repository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const filesService = {
    async uploadImage(file, altText) {
        const imageData = {
            Image_Name: file.filename,
            Image_Link: `/uploads/${file.filename}`,
            Image_Alt: altText || file.originalname
        };
        return await imagesRepository.create(imageData);
    },

    async deleteImage(imageId) {
        const image = await imagesRepository.findById(imageId);
        if (!image) {
            const err = new Error('Image introuvable');
            err.statusCode = 404;
            throw err;
        }

        const filePath = join(__dirname, '../../uploads', image.Image_Name);
        try {
            await unlink(filePath);
        } catch (e) {
            console.warn('Fichier déjà supprimé ou introuvable');
        }

        await imagesRepository.delete(imageId);
        return { message: 'Image supprimée' };
    },

    async getImagePath(imageId) {
        const image = await imagesRepository.findById(imageId);
        if (!image) {
            const err = new Error('Image introuvable');
            err.statusCode = 404;
            throw err;
        }
        return join(__dirname, '../../uploads', image.Image_Name);
    }
};