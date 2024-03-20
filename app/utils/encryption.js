const bcrypt = require ('bcrypt');
const logger = require('../loggers/index.js');

const saltRounds = 10;

const generateHash = async (data) => {
    logger.debug(`File: utils/encryption.js | Log: Generating Hash - @generateHash function`);
    logger.info(`File: utils/encryption.js | Log: Generating Hash - @generateHash function`);
    const hashedData = await bcrypt.hash(data, saltRounds);
    logger.debug(`File: utils/encryption.js | Log: Hash Generated successfully - @generateHash function`);
    logger.info(`File: utils/encryption.js | Log: Hash Generated successfully - @generateHash function`);
    return hashedData.toString();
};

const compareHash = async (data, hash) => {
    logger.debug(`File: utils/encryption.js | Log: Comparing Two Hash - @compareHash function`);
    logger.info(`File: utils/encryption.js | Log: Comparing Two Hash - @compareHash function`);
    const result = await bcrypt.compare(data, hash);
    logger.debug(`File: utils/encryption.js | Log: Hash Compared successfully - @compareHash function`);
    logger.info(`File: utils/encryption.js | Log: Hash Compared successfully - @compareHash function`);
    return result;
};

module.exports = {
    generateHash,
    compareHash
}