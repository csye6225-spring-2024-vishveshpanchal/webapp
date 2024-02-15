// require('dotenv').config();
const express = require('express');
const routes = require('./routes/index.js');
const middlewares = require('./middlewares/index.js');

const app = express();

const makeApp = async (db) => {

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    db.sequelize.sync({ alter: true })
        .then(() => {
            console.log("db.sequelize.sync called from app.js");
        })
        .catch((error) => {
            console.log("Error connecting to database!");
            console.log(error);
    });
    
    // Middlewares handling
    app.use(middlewares.setCacheControls);
    app.use(middlewares.checkDatabaseConnection);
    app.use(middlewares.handleBadPayload);
    
    app.use('/healthz', routes.healthz);
    app.use('/v1/user', routes.user);
    app.use('/*', routes.random);

    return app;
};

module.exports = {
    makeApp
};