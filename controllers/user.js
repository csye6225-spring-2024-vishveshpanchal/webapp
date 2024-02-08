const db = require('../models');
const utils = require('../utils');

const createUser = async (req, res, next) => {
    try {
        // console.log('hit success at createUser');
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const password = req.body.password;
        const username = req.body.username;
        // console.log(req.body.first_name);
        // console.log(req.body.last_name);
        // console.log(req.body.password);
        // console.log(req.body.username);
        const len = Object.keys(req.body).length;
        if (len === 0) {
            console.log("No content to create the user!");
            return res.status(204).end();
        }
        var allowCreate = true;
        Object.keys(req.body).forEach(key => {
            console.log("key: ", key);
            if ((key.toString() !== "first_name") && (key.toString() !== "last_name") && (key.toString() !== "password") && (key.toString() !== "username")) {
                allowCreate = false;
            }
        });
        console.log("len: ", len, " allowCreate: ", allowCreate);

        if (
            !utils.validation.isEmpty(first_name) &&
            !utils.validation.isEmpty(last_name) &&
            !utils.validation.isEmpty(password) &&
            !utils.validation.isEmpty(username) &&
            utils.validation.trimString(first_name) && 
            utils.validation.trimString(last_name) &&
            utils.validation.trimString(username) &&
            utils.validation.validateEmail(username) &&
            allowCreate
        ){
            // const saltRounds = 10;
            // console.log("check above hashed password: ", password);
            // const hashedPassword = await bcrypt.hash(password, saltRounds);
            // console.log(hashedPassword);
            const hashedPassword = await utils.encryption.generateHash(password);

            const newUser = await db.User.create({
                first_name,
                last_name,
                password : hashedPassword,
                username
            });
            console.log('newUser autogenerated id is ', newUser.id);
            return res.status(201).end();
        }
        else {
            console.log("user validation & creation failed!");
            return res.status(400).end();
        }
        
    } catch (error) {
        console.log('Error in createUser:', error);
        return res.status(400).end();
        
    }
};

const getUserSelf = async (req, res, next) => {
    try {
        // console.log("getUserSelf called");
        // console.log(req.user.username);
        // console.log(req.user.first_name);
        // console.log(req.user.last_name);
        const id = req.user.id;
        const first_name = req.user.first_name;
        const last_name = req.user.last_name;
        const username = req.user.username;
        const account_created = req.user.account_created;
        const account_updated = req.user.account_updated;

        return res.status(200).json({
            id,
            first_name,
            last_name,
            username,
            account_created,
            account_updated
        });

    } catch (error) {
        console.log('Error in createUser:', error);
        return res.status(400).end();
    }
};

const updateUserSelf = async (req, res, next) => {
    try {
        // console.log('hit success at createUser');
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const password = req.body.password;
        const len = Object.keys(req.body).length;
        if (len === 0) {
            console.log("No content to update the user!");
            return res.status(204).end();
        }
        var allowUpdate = true;
        Object.keys(req.body).forEach(key => {
            console.log("key: ", key);
            if ((key.toString() !== "first_name") && (key.toString() !== "last_name") && (key.toString() !== "password")) {
                allowUpdate = false;
            }
        });
        console.log("len: ", len, " allowUpdate: ", allowUpdate);
        var areFieldsValid = true;
        Object.keys(req.body).forEach(key => {
            if ((key.toString() === "first_name") && (utils.validation.trimString(first_name) && utils.validation.isEmpty(first_name))) {
                areFieldsValid = false;
            }
            else if ((key.toString() === "last_name") && (utils.validation.trimString(last_name) && utils.validation.isEmpty(last_name))) {
                areFieldsValid = false;
            }
            else if ((key.toString() === "password") && (utils.validation.isEmpty(password))) {
                areFieldsValid = false;
            }
        }); 

        if (allowUpdate && areFieldsValid){
            const username = req.user.username;
            const user = req.user;
            if ("first_name" in req.body) {
                user.first_name = first_name;
            }
            if ("last_name" in req.body) {
                user.last_name = last_name;
            }
            if ("password" in req.body) {
                const hashedPassword = await utils.encryption.generateHash(password);
                user.password = hashedPassword;
            }
            user.account_updated = new Date();

            await db.User.update(user, { where: { username: username } });

            console.log('updatedUser\'s username is ', req.user.username);
            return res.status(201).end();
        }
        else {
            console.log("Bad content to update!");
            return res.status(400).end();
        }
    } catch (error) {
        console.log('Error in updateUserSelf:', error);
        return res.status(400).end();
    }
};

module.exports = {
    createUser,
    getUserSelf,
    updateUserSelf
}