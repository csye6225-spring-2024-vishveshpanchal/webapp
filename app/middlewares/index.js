const db = require('../models/index.js');
const middlewares = {};
const logger = require('../loggers/index.js');

middlewares.setCacheControls = ((req, res, next) => {
    // console.log("setCacheControls middleware called");
    logger.info(`File: middlewares/index.js | Log: Setting Cache Controls @middlewares.setCacheControls function`);
    logger.debug(`File: middlewares/index.js | Log: Setting Cache Controls - continuing @middlewares.setCacheControls function`);
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    next();
});

middlewares.checkDatabaseConnection  = async (req, res, next) => {
    // console.log("checkDatabaseConnection middleware called");
    logger.info(`File: middlewares/index.js | Log: Checking Database Connection @middlewares.checkDatabaseConnection function`);
    logger.debug(`File: middlewares/index.js | Log: Checking Database Connection @middlewares.checkDatabaseConnection function`);
    try {
      await db.sequelize.authenticate();
      logger.info(`File: middlewares/index.js | Log: Database Connection is Established - @middlewares.checkDatabaseConnection function`);
      logger.debug(`File: middlewares/index.js | Log: Database Connection is Established - continuing @middlewares.checkDatabaseConnection function`);
      // console.log('Database connection is established.');
    } catch {
      // console.log('Unable to connect to the database');
      logger.debug(`File: middlewares/index.js | Log: Error in Checking Database Connection - Sending response with 503 status and continuing @middlewares.checkDatabaseConnection function`);
      logger.error(`File: middlewares/index.js | Log: Error in Checking Database Connection - @middlewares.checkDatabaseConnection function`);
      res.status(503).end();
    }
    next();
};

middlewares.handlePayload  = (req, res, next) => {
    // console.log("handlePayload middleware called");
    logger.info(`File: middlewares/index.js | Log: Handling Payload @middlewares.handlePayload function`);
    logger.debug(`File: middlewares/index.js | Log: Handling Payload @middlewares.handlePayload function`);
    try {
      objKeys = Object.keys(req.body);
      if (!(req.get('content-length') >= 1) && !(req.originalUrl.toString().trim() !== "/healthz")) {
          // console.log('payload empty');
          logger.info(`File: middlewares/index.js | Log: Handling Payload: Payload is Empty! - @middlewares.handlePayload function`);
          logger.debug(`File: middlewares/index.js | Log: Handling Payload: Payload is Empty! - @middlewares.handlePayload function`);
          // return res.status(200).end();
      }
      else {
          // console.log('payload present OR URL with query data');
          logger.info(`File: middlewares/index.js | Log: Handling Payload: Payload is Present via body or query - @middlewares.handlePayload function`);
          logger.debug(`File: middlewares/index.js | Log: Handling Payload: Payload is Present via body or query - Sending response with 503 status and continuing @middlewares.handlePayload function`);
          return res.status(400).end();
      }
    } catch (error) {
      // console.log("Error in middleware handlePayload");
      logger.debug(`File: middlewares/index.js | Log: Error in Handling Payload - continuing @middlewares.handlePayload function`);
      logger.error(`File: middlewares/index.js | Log: Error in Handling Payload - @middlewares.handlePayload function`);
    }
    next();
};

middlewares.handleBadPayload  = (err, req, res, next) => {
  console.log("handleBadPayload middleware called");
  try {
    if('body' in err){ //for bad payload
        logger.info(`File: middlewares/index.js | Log: Handling BadPayload: Payload passed is in wrong Format - @middlewares.handleBadPayload function`);
        logger.debug(`File: middlewares/index.js | Log: Handling BadPayload: Payload passed is in wrong Format - Sending response with 400 status @middlewares.handleBadPayload function`);
        res.status(400).end();
    }
  } catch (error) {
    // console.log("Error in middleware handleBadPayload");
    logger.debug(`File: middlewares/index.js | Log: Error in Handling Bad Payload - @middlewares.handleBadPayload function`);
    logger.error(`File: middlewares/index.js | Log: Error in Handling Bad Payload - @middlewares.handleBadPayload function`);
  }
};

middlewares.isAuthPresent = (req, res, next) => {
  // console.log("isAuthPresent middleware called");
  // console.log(req.headers.authorization);
  logger.info(`File: middlewares/index.js | Log: Checking if Authentication is Present or not - @middlewares.isAuthPresent function`);
  logger.debug(`File: middlewares/index.js | Log: Checking if Authentication is Present or not - Sending response with 400 status @middlewares.isAuthPresent function`);
  if (req.headers.authorization) {
    logger.info(`File: middlewares/index.js | Log: Authentication is not present - @middlewares.isAuthPresent function`);
    logger.debug(`File: middlewares/index.js | Log: Authentication is not present - Sending response with 400 status @middlewares.isAuthPresent function`);
    return res.status(400).end();
  }
  logger.info(`File: middlewares/index.js | Log: Authentication is Present - @middlewares.isAuthPresent function`);
  logger.debug(`File: middlewares/index.js | Log: Authentication is Present - @middlewares.isAuthPresent function`);
  next();
};


module.exports = middlewares;