import { Image } from '../models/image.model.js';

export const imagesRepository = {
    findById(id) {
        return Image.findByPk(id);
    },

    create(data) {
        return Image.create(data);
    },

    delete(id) {
        return Image.destroy({ where: { Image_Id: id } });
    }
};