const express = require('express');
const basicAuth = require('../middlewares/basicAuth');
const middlewares = require('../middlewares');
const { 
    createUser, 
    getUserSelf,
    updateUserSelf } = require('../controllers/user');
const router = express.Router();

router.post('/', middlewares.isAuthPresent, createUser);

router.use(basicAuth);

router.get("/self", getUserSelf);
router.put("/self", updateUserSelf);

module.exports = router;