const winston = require('winston');
const { combine, timestamp, prettyPrint, printf, json, errors } = winston.format;

const path = require('path');
const fs = require('fs');

const logFilePath = path.join(__dirname, 'app.log');

if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '');
}

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const myJSONFormat = printf(({ timestamp, level, service, message }) => {
    return `{
     timestamp: ${timestamp}
     level: ${level}
     service: ${service}
     message: ${message}
    }`;
});

const appLoggerProd = () => {
    return winston.createLogger({
        level: 'info',
        format: combine(
            errors({stack: true}),
            timestamp(),
            json(),
            // myFormat,
            // myJSONFormat,
            // prettyPrint(),
          ),
        defaultMeta: { service: 'app-service' },
        transports: [
            new winston.transports.File({ filename: logFilePath }),
            // new winston.transports.File({ filename: 'app.log', level: 'info' }),
            // new winston.transports.File({ filename: 'error.log', level: 'error' }),
            // new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
        ],
      });
};

module.exports = appLoggerProd;