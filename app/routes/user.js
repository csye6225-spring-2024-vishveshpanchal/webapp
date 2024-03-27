const express = require('express');
const basicAuth = require('../middlewares/basicAuth');
const middlewares = require('../middlewares');
const { 
    createUser, 
    getUserSelf,
    updateUserSelf,
    verifyUser } = require('../controllers/user');
const isUserAuthorized = require('../middlewares/verifiedUser');
const router = express.Router();

router.post('/', middlewares.isAuthPresent, createUser);
router.get('/verify', verifyUser);

router.use(basicAuth);
router.use(isUserAuthorized);

router.get("/self", getUserSelf);
router.put("/self", updateUserSelf);

module.exports = router;