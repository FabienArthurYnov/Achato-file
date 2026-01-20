import axios from 'axios';
import { env } from '../config/env.js';

const AUTH_SERVICE_URL = env.authServiceUrl;
const SERVICE_TOKEN = env.authServiceToken;

// Vérifie le service token (toutes les routes)
export const serviceMiddleware = (req, res, next) => {
    const serviceToken = req.headers['x-service-token'];

    console.log('Token reçu:', serviceToken);
    console.log('Token attendu:', SERVICE_TOKEN);

    if (!SERVICE_TOKEN) {
        return res.status(500).json({ message: 'SERVICE_TOKEN non configuré' });
    }

    if (serviceToken !== SERVICE_TOKEN) {
        return res.status(403).json({ message: 'Service non autorisé' });
    }

    req.isServiceCall = true;
    next();
};

// Vérifie le JWT via auth service (routes privées)
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('=== AUTH MIDDLEWARE DEBUG ===');
    console.log('Authorization header:', authHeader);
    console.log('AUTH_SERVICE_URL:', AUTH_SERVICE_URL);
    console.log('SERVICE_TOKEN:', SERVICE_TOKEN);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        console.log('Calling verify at:', `${AUTH_SERVICE_URL}/api/secure/verify`);

        const response = await axios.get(`${AUTH_SERVICE_URL}/api/secure/verify`, {
            headers: {
                'Authorization': authHeader,
                'x-service-token': SERVICE_TOKEN
            }
        });

        console.log('Auth response:', response.data);

        if (response.data.valid) {
            req.user = response.data.user;
            next();
        } else {
            return res.status(401).json({ message: 'Token invalide' });
        }
    } catch (error) {
        console.log('Auth error status:', error.response?.status);
        console.log('Auth error data:', error.response?.data);
        console.log('Auth error message:', error.message);
        return res.status(401).json({ message: 'Erreur de vérification du token' });
    }
};
