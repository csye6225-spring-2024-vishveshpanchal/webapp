// require('dotenv').config();
// require('dotenv').config({ path: '/opt/csye6225/app/.env' });
// console.log(process.env);
// WorkingDirectory=/opt/csye6225

const express = require('express');
const app = express();
const db = require('./models/index.js');
const routes = require('./routes/index.js');
const middlewares = require('./middlewares/index.js');
const logger = require('./loggers/index.js');

const PORT = process.env.PORT || 3000;

logger.warn("warn logger - check @index.js");
logger.error("error logger - check @index.js");
logger.info("info logger - check @index.js");
logger.debug("debug logger - check @index.js");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.createDatabaseIfNotPresent().then(() => {
    logger.debug("File: index.js | Log: @createDatabaseIfNotPresent function | STARTS");
    logger.info("File: index.js | Log: @createDatabaseIfNotPresent function");
    app.listen(PORT, () => {
        // console.log(`Application listening on port ${PORT}`);
        logger.info(`File: index.js | Application listening on port ${PORT}`);
        logger.debug(`File: index.js | Application listening on port ${PORT}`);
    });
}).catch(() => {
    logger.info("File: index.js | Log: Error at @createDatabaseIfNotPresent function");
    logger.error("File: index.js | Log: Error at @createDatabaseIfNotPresent function");
    // console.log("Error at createDatabaseIfNotPresent at index.js");
});

// Middlewares handling
app.use(middlewares.setCacheControls);
app.use(middlewares.checkDatabaseConnection);
app.use(middlewares.handleBadPayload);

app.use('/healthz', routes.healthz);
app.use('/v2/user', routes.user);
app.use('/*', routes.random);


// app.listen(PORT, () => {
//     console.log(`Application listening on port ${PORT}`);
// });
