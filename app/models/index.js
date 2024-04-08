// require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const mysql = require('mysql2/promise');
const db = {};
const logger = require('../loggers/index.js');

let sequelize;

const createDatabaseIfNotPresent = async () => {
    try {
        const { host, port, username:user, password, database } = config;
        // console.log('Connecting to MySQL with:', { host, port, user, database });
        logger.debug(`File: models/index.js | Log: Connecting to MySQL with host: ${host}, port: ${port}, username: ${user}, password: ${password}, database: ${database} - @createDatabaseIfNotPresent function`);
        logger.info(`File: models/index.js | Log: Connecting to MySQL - @createDatabaseIfNotPresent function`);
        const connection = await mysql.createConnection({ host, port, user, password });
        // console.log('Connected to MySQL');
        logger.debug(`File: models/index.js | Log: Connected to MySQL & creating database if it doesn't exist - @createDatabaseIfNotPresent function`);
        logger.info(`File: models/index.js | Log: Connected to MySQL & creating database if it doesn't exist - @createDatabaseIfNotPresent function`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        // console.log(`Database '${database}' created or already exists.`);
        logger.debug(`File: models/index.js | Log: Database ${database} Created/Already Exists - @createDatabaseIfNotPresent function`);
        logger.info(`File: models/index.js | Log: Database ${database} Created/Already Exists - @createDatabaseIfNotPresent function`);
        await connection.close();
        db.sequelize.sync({ alter: true })
            .then(() => {
                // console.log("db.sequelize.sync called from createDatabaseIfNotPresent()");
                logger.debug(`File: models/index.js | Log: Syncing Database - @createDatabaseIfNotPresent function`);
                logger.info(`File: models/index.js | Log: Syncing Database - @createDatabaseIfNotPresent function`);
            })
            .catch((error) => {
                // console.log("Error connecting to database!");
                // console.log(error);
                logger.debug(`File: models/index.js | Log: Error syncing to Database ${database} - @createDatabaseIfNotPresent function`);
                logger.error(`File: models/index.js | Log: Error syncing to Database ${database} - @createDatabaseIfNotPresent function`);
        });
    } catch (error) {
        // console.error(`Error creating database: ${error.message}`);
        logger.debug(`File: models/index.js | Log: Error creating Database - @createDatabaseIfNotPresent function`);
        logger.error(`File: models/index.js | Log: Error creating Database - @createDatabaseIfNotPresent function`);
    }
}

const closeDatabaseConnection = async () => {
    logger.debug(`File: models/index.js | Log: Closing Database - @closeDatabaseConnection function`);
    logger.info(`File: models/index.js | Log: Closing Database - @closeDatabaseConnection function`);
    try {
        await db.sequelize.close();
        logger.debug(`File: models/index.js | Log: Database Closed - @closeDatabaseConnection function`);
        logger.info(`File: models/index.js | Log: Database Closed - @closeDatabaseConnection function`);
    } catch (error) {
        // console.error(`Error closing database: ${error.message}`);
        logger.debug(`File: models/index.js | Log: Error closing Database - @closeDatabaseConnection function`);
        logger.error(`File: models/index.js | Log: Error closing Database - @closeDatabaseConnection function`);
    }
};

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} 
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
    return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
    );
    })
    .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
    db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.createDatabaseIfNotPresent = createDatabaseIfNotPresent;
db.closeDatabaseConnection = closeDatabaseConnection;

module.exports = db;
