// next-i18next.config.js
const path = require('path'); // Add this line to import the path module

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'pt'],
    },
    // Optionally, configure locale path if your translations are stored in a custom directory
    localePath: path.resolve('./src/locales'),
};
