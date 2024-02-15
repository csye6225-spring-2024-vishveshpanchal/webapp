require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const mysql = require('mysql2/promise');
const db = {};

let sequelize;

const createDatabaseIfNotPresent = async () => {
    try {
        const { host, port, username:user, password, database } = config;
        console.log('Connecting to MySQL with:', { host, port, user, database });
        const connection = await mysql.createConnection({ host, port, user, password });
        console.log('Connected to MySQL');
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        console.log(`Database '${database}' created or already exists.`);
        await connection.close();
        db.sequelize.sync({ alter: true })
            .then(() => {
                console.log("db.sequelize.sync called from createDatabaseIfNotPresent()");
            })
            .catch((error) => {
                console.log("Error connecting to database!");
                console.log(error);
        });
    } catch (error) {
        console.error(`Error creating database: ${error.message}`);
    }
}

createDatabaseIfNotPresent();

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

module.exports = db;
