const express = require('express');
const routes = require('./routes/index.js');
const middlewares = require('./middlewares/index.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares handling
app.use(middlewares.setCacheControls);
app.use(middlewares.checkDatabaseConnection);
app.use(middlewares.handleBadPayload);

app.use('/healthz', routes.healthz);
app.use('/v1/user', routes.user);
app.use('/*', routes.random);

module.exports = {
    app
};