const logger = require('../loggers/index.js');

const validateEmail = (email) => {
    // console.log(email)
    logger.debug(`File: utils/validation.js | Log: Validating Email - @validateEmail function`);
    logger.info(`File: utils/validation.js | Log: Validating Email - @validateEmail function`);
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isEmpty = (data) => {
    // console.log("is Empty");
    // console.log(data)
    // console.log(!data);
    // console.log(data.length === 0);
    logger.debug(`File: utils/validation.js | Log: Validating Empty Fields - @isEmpty function`);
    logger.info(`File: utils/validation.js | Log: Validating Empty Fields - @isEmpty function`);
    return (!data || data.length === 0 );
};

const trimString = (data) => {
    // console.log("trim String");
    // console.log(data)
    // console.log(data.trim());
    logger.debug(`File: utils/validation.js | Log: Validating Strings & Trimming - @trimString function`);
    logger.info(`File: utils/validation.js | Log: Validating Strings & Trimming - @trimString function`);
    data.trim();
    return true;
};

module.exports = {
    validateEmail,
    isEmpty,
    trimString
}