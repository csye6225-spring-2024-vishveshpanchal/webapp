const routes = {};

routes.healthz = require("./healthz");
routes.user = require("./user");
routes.random = require("./random");

module.exports = routes;