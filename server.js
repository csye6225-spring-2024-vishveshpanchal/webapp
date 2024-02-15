
const db = require('./models/index.js');
const { makeApp } = require('./app.js');

const app = makeApp(db);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});