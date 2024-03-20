require('dotenv').config();

const appLoggerProd = require('./appLoggerProd');
const appLoggerDev = require('./appLoggerDev');

let logger = null;

if (process.env.NODE_ENV === 'development') {
    logger = appLoggerDev();
}
// if (process.env.NODE_ENV === 'production') {
else {
    logger = appLoggerProd();
}


module.exports = logger;