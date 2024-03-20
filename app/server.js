// require('dotenv').config();
// require('dotenv').config({ path: '/opt/csye6225/app/.env' });

const db = require('./models/index.js');
const { app } = require('./app.js');
const logger = require('./loggers/index.js');

const PORT = process.env.PORT || 3000;

logger.warn("warn logger - check @server.js");
logger.error("error logger - check @server.js");
logger.info("info logger - check @server.js");
logger.debug("debug logger - check @server.js");

db.createDatabaseIfNotPresent().then(() => {
    // const loggerProfiler = logger.startTimer();
    logger.debug("File: server.js | Log: @createDatabaseIfNotPresent function | STARTS");
    logger.info("File: server.js | Log: @createDatabaseIfNotPresent function");
    app.listen(PORT, () => {
        // console.log(`Application listening on port ${PORT}`);
        logger.info(`File: server.js | Application listening on port ${PORT}`);
        logger.debug(`File: server.js | Application listening on port ${PORT}`);
    });
    logger.debug("File: server.js | Log: @createDatabaseIfNotPresent function | ENDS");
    // loggerProfiler.done({ message: `loggerProfiler - File: server.js Log: createDatabaseIfNotPresent function ends` });
}).catch(() => {
    // console.log("Error at createDatabaseIfNotPresent at server.js");
    logger.info("File: server.js | Log: Error at @createDatabaseIfNotPresent function");
    logger.error("File: server.js | Log: Error at @createDatabaseIfNotPresent function");
});



// services:
//       mysql:
//         image: mysql:5.7
//         env:
//           MYSQL_DATABASE: ${{ secrets.DB_NAME }}
//           MYSQL_USER: ${{ secrets.DB_USERNAME }}
//           MYSQL_PASSWORD: ${{ secrets.DB_PASSWORD }}
//           MYSQL_ROOT_PASSWORD: password
//         ports:
//           - 3306:3306
//         options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3