require('dotenv').config();

// const { v4: uuidv4 } = require('uuid');
// const jwt = require('jsonwebtoken');
const url = require('node:url');
const logger = require('../loggers/index.js');

const applicationPort = process.env.PORT;
const domainName = process.env.DNS_NAME;
// const uniqueID = uuidv4();
// const jwtSecret = process.env.JWT_SECRET;
// const jwtExpiry = process.env.JWT_EXPIRY_SEC;

// async function generateToken(uniqueID) {
//     const expiry = jwtExpiry.toString();
//     const secretKey = jwtSecret;
//     return jwt.sign({ id: uniqueID }, secretKey, { expiresIn: expiry });
// }

// const generateTokenAndLink = async (email) => {
//     const token = await generateToken(uniqueID);
// //    console.log(token);
//     verificationLink = "http://" + domainName.toString() + ":" + applicationPort.toString() + "/v1/user/verify?email=" + email.toString() + "&token=" + token;
//     const returnTokenAndLinkObj = {
//         "token": token,
//         "verificationLink": verificationLink
//     }
//     return returnTokenAndLinkObj;
// };

const generateLinkViaUUID = async (uuid, email) => {
    
    const verificationLink = "http://" 
                            + domainName.toString() 
                            + ":" 
                            + applicationPort.toString() 
                            + "/v2/user/verify?email=" 
                            + email.toString() 
                            + "&token=" + uuid.toString();
    
    const returnTokenAndLinkObj = {
        "token": uuid,
        "verificationLink": verificationLink
    }
    return returnTokenAndLinkObj;
};


// async function verifyToken(token) {
//     try {
//         const decoded = jwt.verify(token, jwtSecret);
//         console.log('Token verified:', decoded);
//         return true;
//         // res.send('Email verified successfully!');
//     } catch (error) {
//         console.error('Token verification failed:', error);
//         return false;
//         // res.status(400).send('Invalid or expired token');
//     }
// }

// const verifyEmailToken = async (token) => {
//     const isVerifiedSuccessfully = verifyToken(token);
//     return isVerifiedSuccessfully;
// };

const verifyEmailTokenViaUUID = async (token, expiryTime) => {
    var isValid = true;
    const currentTime = new Date();
    if (expiryTime > currentTime) {
        isValid = true;
    }
    else {
        isValid = false;
    }

    return isValid;
};

const areVerifyLinkQueryKeysValid = async (urlLink) => {
    try {
        logger.debug(`File: utils/emailVerification.js | Log: Verifying Link Query Keys - @areVerifyLinkQueryKeysValid function`);
        logger.info(`File: utils/emailVerification.js | Log: Verifying Link Query Keys - @areVerifyLinkQueryKeysValid function`);
        
        if (!urlLink.startsWith("https") || !urlLink.startsWith("http")){
            urlLink = "https://" + urlLink;
        }
        const parsedUrl = new URL("https://"+urlLink);

        var isValid = false;

        const params = new URLSearchParams(parsedUrl.search);
        let urlLink_email = "";
        let urlLink_token = "";
        let areAdditionalKeysPresent = false;
        for (let name of params.keys()) {
            if (name.toString() === "email" && urlLink_email === ""){
                urlLink_email = params.get(name).toString();
            }
            else if (name.toString() === "email" && urlLink_email !== ""){
                areAdditionalKeysPresent = true;
            }
            else if (name.toString() === "token" && urlLink_token === ""){
                urlLink_token = params.get(name).toString();
            }
            else if (name.toString() === "token" && urlLink_token !== ""){
                areAdditionalKeysPresent = true;
            }
            else{
                areAdditionalKeysPresent = true;
            }
        }
        if (areAdditionalKeysPresent || urlLink_email == "" || urlLink_token == "") {
            isValid = false;
            logger.debug(`File: utils/emailVerification.js | Log: Invalid Verification Link - @areVerifyLinkQueryKeysValid function`);
            logger.info(`File: utils/emailVerification.js | Log: Invalid Verification Link - @areVerifyLinkQueryKeysValid function`);
        } else {
            isValid = true;
            logger.debug(`File: utils/emailVerification.js | Log: Valid Verification Link - @areVerifyLinkQueryKeysValid function`);
            logger.info(`File: utils/emailVerification.js | Log: Valid Verification Link - @areVerifyLinkQueryKeysValid function`);
        }

        const returnObj = {
            "isValid": isValid,
            "email": urlLink_email,
            "token": urlLink_token,
        };
        return returnObj;

    } catch (error) {
        logger.debug(`File: utils/emailVerification.js | Log: Error in Verifying Link Query Keys @areVerifyLinkQueryKeysValid function`);
        logger.error(`File: utils/emailVerification.js | Log: Error in Verifying Link Query Keys @areVerifyLinkQueryKeysValid function`);
        const returnObj = { "isValid": false };
        return returnObj;
    }
};

module.exports = {
    // generateTokenAndLink,
    generateLinkViaUUID,
    // verifyEmailToken,
    verifyEmailTokenViaUUID,
    areVerifyLinkQueryKeysValid
}


