import express from 'express';
    import cors from 'cors';
    import { fileURLToPath } from 'url';
    import { dirname, join } from 'path';
    import filesRoutes from './routes/files.routes.js';
    import { errorHandler } from './middlewares/error.middleware.js';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    export const createApp = () => {
        const app = express();
        app.use(cors());
        app.use(express.json());

        app.use('/uploads', express.static(join(__dirname, '../uploads')));
        app.use('/api/files', filesRoutes);
        app.use(errorHandler);
        return app;
    };