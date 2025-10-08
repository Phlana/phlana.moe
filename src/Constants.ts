const prodUrl = 'https://phlana.moe';
const prodApiUrl = 'https://api.phlana.moe';
const devUrl = 'http://localhost:3000';
const devApiUrl = 'http://localhost:3000';

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

export const apiUrl = (() => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return devApiUrl;
        case 'production':
            return prodApiUrl;
        default:
            return '';
    };
})();
