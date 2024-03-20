const logger = require('../loggers/index.js');

const healthz = async (req, res, next) => {
    try {
        // throw new ConnectionError();
        logger.debug(`File: controllers/healthz.js | Log: Sending response with 200 status @healthz function`);
        logger.info(`File: controllers/healthz.js | Log: Application Health OK - Valid URL @healthz function`);
        return res.status(200).end();
    } catch (error) {
        logger.debug(`File: controllers/healthz.js | Log: will go to check next middleware errors @healthz function`);
        logger.error(`File: controllers/healthz.js | Log: @healthz function`);
        next(error);
    }
};

const methodNotAllowed = async (req, res, next) => {
    try {
        logger.debug(`File: controllers/healthz.js | Log: Sending response with 405 status @methodNotAllowed function`);
        logger.info(`File: controllers/healthz.js | Log: Method Not Allowed @methodNotAllowed function`);
        return res.status(405).end();
    } catch (error) {
        logger.debug(`File: controllers/healthz.js | Log: Sending response with 400 status @methodNotAllowed function`);
        logger.error(`File: controllers/healthz.js | Log: @methodNotAllowed function`);
        return res.status(400).end();
    }
};

module.exports = {
    healthz,
    methodNotAllowed
}
