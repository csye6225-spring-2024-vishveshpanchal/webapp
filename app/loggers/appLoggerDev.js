const winston = require('winston');
const { combine, timestamp, printf, prettyPrint, errors, colorize } = winston.format;

const myJSONFormat = printf(({ timestamp, level, service, message }) => {
    return `
    [ 
        timestamp: ${timestamp}     level: ${level}     service: ${service} 
        message  : ${message} 
    ]`;
});

const appLoggerDev = () => {
    return winston.createLogger({
        level: 'info',
        format: combine(
            errors({stack: true}),
            timestamp({ format: "HH:mm:ss" }),
            colorize(),
            myJSONFormat,
            // prettyPrint(),
          ),
        defaultMeta: { service: 'app-service' },
        transports: [
            new winston.transports.Console()
        ],
      });
};

module.exports = appLoggerDev;