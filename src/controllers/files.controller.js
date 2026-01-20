import { filesService } from '../services/files.service.js';

export const filesController = {
    upload: async (req, res, next) => {
        try {
            if (!req.file) {
                const err = new Error('Aucun fichier envoyé');
                err.statusCode = 400;
                throw err;
            }
            const image = await filesService.uploadImage(req.file, req.body.alt);
            res.status(201).json({
                id: image.Image_Id,
                name: image.Image_Name,
                link: image.Image_Link,
                alt: image.Image_Alt
            });
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const result = await filesService.deleteImage(req.params.id);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    },

    serve: async (req, res, next) => {
        try {
            const filePath = await filesService.getImagePath(req.params.id);
            res.sendFile(filePath);
        } catch (e) {
            next(e);
        }
    }
};