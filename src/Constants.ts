const prodUrl = 'https://api.phlana.moe';
const devUrl = 'http://localhost:3000';

export const url = (() => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return devUrl;
        case 'production':
            return prodUrl;
        default:
            return '';
    };
})();
