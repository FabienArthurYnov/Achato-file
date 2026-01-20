import { createApp } from './app.js';
import { env } from './config/env.js';
import { initDb } from './config/db.js';
import './models/image.model.js';

const bootstrap = async () => {
    try {
        await initDb();
        console.log('Database connected');
        const app = createApp();
        app.listen(env.port, () => {
            console.log(`achato-file running on port ${env.port}`);
        });
    } catch (error) {
        console.error('Failed to start:', error);
        process.exit(1);
    }
};

bootstrap();