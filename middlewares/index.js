const db = require('../models/index.js');
const middlewares = {};

middlewares.setCacheControls = ((req, res, next) => {
    console.log("setCacheControls middleware called");
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    next();
});

middlewares.checkDatabaseConnection  = async (req, res, next) => {
    console.log("checkDatabaseConnection middleware called");
    try {
      await db.sequelize.authenticate();
      console.log('Database connection is established.');
    } catch {
      console.log('Unable to connect to the database');
      res.status(503).end();
    }
    next();
};

middlewares.handlePayload  = (req, res, next) => {
    console.log("handlePayload middleware called");
    try {
      objKeys = Object.keys(req.body);
      if (!(req.get('content-length') >= 1) && !(req.originalUrl.toString().trim() !== "/healthz")) {
          console.log('payload empty');
          // return res.status(200).end();
      }
      else {
          console.log('payload present OR URL with query data');
          return res.status(400).end();
      }
    } catch (error) {
      console.log("Error in middleware handlePayload");
    }
    next();
};

middlewares.handleBadPayload  = (err, req, res, next) => {
  console.log("handleBadPayload middleware called");
  try {
    if('body' in err){ //for bad payload
        res.status(400).end();
    }
  } catch (error) {
    console.log("Error in middleware handleBadPayload");
  }
};


module.exports = middlewares;