import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const SERVICE_TOKEN = process.env.AUTH_SERVICE_TOKEN;

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/verify`, {
            headers: {
                'Authorization': authHeader,
                'X-Service-Token': SERVICE_TOKEN
            }
        });

        if (response.data.valid) {
            req.user = response.data.user;
            next();
        } else {
            return res.status(401).json({ message: 'Token invalide' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Erreur de vérification du token' });
    }
};

export const serviceMiddleware = (req, res, next) => {
    const serviceToken = req.headers['x-service-token'];

    if (serviceToken === SERVICE_TOKEN) {
        req.isServiceCall = true;
        return next();
    }

    return res.status(403).json({ message: 'Service non autorisé' });
};

export const authOrServiceMiddleware = async (req, res, next) => {
    const serviceToken = req.headers['x-service-token'];

    if (serviceToken === SERVICE_TOKEN) {
        req.isServiceCall = true;
        return next();
    }

    return authMiddleware(req, res, next);
};