const logger = require('../loggers/index.js');

const handleRandomUrls = async (req, res, next) => {
    try {
        // console.log("Invalid URL");
        logger.info(`File: controllers/random.js | Log: URL Not Found - Invalid Url @handleRandomUrls function`);
        logger.debug(`File: controllers/random.js | Log: Invalid Url - Sending response with 404 status @handleRandomUrls function`);
        return res.status(404).end();
    } catch (error) {
        logger.debug(`File: controllers/random.js | Log: Invalid Url - will go to check next middleware errors @handleRandomUrls function`);
        logger.error(`File: controllers/random.js | Log: @handleRandomUrls function`);
        next(error);
    }
};

module.exports = {
    handleRandomUrls
}
