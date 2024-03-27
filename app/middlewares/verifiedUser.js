// const db = require("../models");
// const utils = require('../utils');
const logger = require('../loggers/index.js');


const isUserAuthorized = async (req, res, next) => {

    try {
        if (req.user.verified === "true") {
            logger.info(`File: middlewares/verifiedUser.js | Log: Username: ${req.user.username} is Authorized - @isUserAuthorized function`);
            logger.debug(`File: middlewares/verifiedUser.js | Log: Username: ${req.user.username} is Authorized - @isUserAuthorized function`);
        }
        else {
            logger.info(`File: middlewares/verifiedUser.js | Log: Username: ${req.user.username} is Unauthorized (Email not verified) - @isUserAuthorized function`);
            logger.debug(`File: middlewares/verifiedUser.js | Log: Username: ${req.user.username} is Unauthorized (Email not verified) - @isUserAuthorized function`);
            return res.status(403).end();
        }

        next();

    } catch (error) {
        logger.debug(`File: middlewares/basicAuth.js | Log: Error in Authenticating User - Sending response with 500 status @basicAuth function`);
        logger.error(`File: middlewares/basicAuth.js | Log: Error in Authenticating User @updateUserSelf function`);
        return res.status(500).end();
    }

}


module.exports = isUserAuthorized;