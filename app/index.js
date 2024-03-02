// require('dotenv').config();
require('dotenv').config({ path: '/opt/csye6225/app/.env' });
console.log(process.env);
// WorkingDirectory=/opt/csye6225

const express = require('express');
const app = express();
const db = require('./models/index.js');
const routes = require('./routes/index.js');
const middlewares = require('./middlewares/index.js');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.createDatabaseIfNotPresent().then(() => {
    app.listen(PORT, () => {
        console.log(`Application listening on port ${PORT}`);
    });
}).catch(() => {
    console.log("Error at createDatabaseIfNotPresent at index.js");
});

// Middlewares handling
app.use(middlewares.setCacheControls);
app.use(middlewares.checkDatabaseConnection);
app.use(middlewares.handleBadPayload);

app.use('/healthz', routes.healthz);
app.use('/v1/user', routes.user);
app.use('/*', routes.random);


// app.listen(PORT, () => {
//     console.log(`Application listening on port ${PORT}`);
// });
