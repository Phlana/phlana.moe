import jwt from 'jsonwebtoken';
import config from './config.json';

export const generateToken = (code) => {
    return jwt.sign({ code }, config.jwt_secret_key, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, config.jwt_secret_key);
};
