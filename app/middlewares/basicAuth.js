const db = require("../models");
const utils = require('../utils');

const basicAuth = async (req, res, next) => {
    // console.log("basic Auth called");

    // make authenticate path public
    if (req.path === '/users/authenticate') {
        return next();
    }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // console.log(username);
    // console.log(password);

    // attach user to request object
    // req.username = username;


    try {
        const userAuthenticated = await db.User.findOne({ where: 
            { username: username },
            attributes: ["id", "username", "password", "first_name", "last_name", "account_created", "account_updated"],
        });
        if (userAuthenticated === null) {
            console.log("username not found!");
            return res.status(401).end();
        }
        else {
            // console.log("User found!");
            // console.log("userAuthenticated.username: ", userAuthenticated.username);
            // console.log("userAuthenticated.password: ", userAuthenticated.password);
            // console.log("userAuthenticated.first_name: ", userAuthenticated.first_name);
            // console.log("userAuthenticated.last_name: ", userAuthenticated.last_name);

            const isPasswordCorrect = await utils.encryption.compareHash(password, userAuthenticated.password);

            if (!isPasswordCorrect) {
                console.log("Password is incorrect for username: ", username);
                return res.status(401).end();
            }

            console.log("username: ", username, " is now logged in with correct password!");

            req.user = {
                id: userAuthenticated.id,
                username: userAuthenticated.username,
                first_name: userAuthenticated.first_name,
                last_name: userAuthenticated.last_name,
                account_created: userAuthenticated.account_created,
                account_updated: userAuthenticated.account_updated,
            };
            // req.user = {
            //     id: userAuthenticated.id,
            //     username: userAuthenticated.username,
            //     first_name: userAuthenticated.first_name,
            //     last_name: userAuthenticated.last_name,
            // };

            next();
        }

    } catch (error) {
        console.log("Error in basic Auth Database access findOne, ", error);
        return res.status(500).end(); // CHECK!!!!!!!
        // next(); // CHECK!!!!!!!
    }

};

module.exports = basicAuth;