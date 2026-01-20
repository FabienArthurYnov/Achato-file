import { Sequelize } from 'sequelize';
import { env } from './env.js';

export const sequelize = new Sequelize(
    env.db.name,
    env.db.user,
    env.db.password,
    {
        host: env.db.host,
        port: Number(env.db.port),
        dialect: 'mysql',
        logging: false,
    }
);

export async function initDb() {
    await sequelize.authenticate();
}
