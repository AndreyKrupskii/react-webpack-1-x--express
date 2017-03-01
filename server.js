require('babel-core/register');

const ignore = ['.css', '.less', '.scss', '.ttf', '.woff', '.woff2'];

ignore.forEach((ext) => require.extensions[ext] = () => {});

require('babel-polyfill');

require('./src/server');