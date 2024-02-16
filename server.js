
const db = require('./models/index.js');
// const { makeApp } = require('./app.js');
const { app } = require('./app.js');

// const app = makeApp();

// db.sequelize.sync({ alter: true })
// .then(() => {
//     console.log("db.sequelize.sync called from app.js");
// })
// .catch((error) => {
//     console.log("Error connecting to database!");
//     console.log(error);
// });

const PORT = process.env.PORT || 3000;

db.createDatabaseIfNotPresent().then(() => {
    app.listen(PORT, () => {
        console.log(`Application listening on port ${PORT}`);
    });
}).catch(() => {
    console.log("Error at createDatabaseIfNotPresent at server.js");
});
