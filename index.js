require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models/index.js');
const routes = require('./routes/index.js');
const middlewares = require('./middlewares/index.js');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Original
// db.sequelize.sync()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Application listening on port ${PORT}`);
//         });
// })
//     .catch((error) => {
//         console.log("Error connecting to database!");
//         console.log(error);
// });
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("db.sequelize.sync called from app/index.js");
        // Commented because Database issue
        // app.listen(PORT, () => {
        //     console.log(`Application listening on port ${PORT}`);
        // });
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


app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});
