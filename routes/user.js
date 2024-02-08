const express = require('express');
const basicAuth = require('../middlewares/basicAuth');
const { 
    createUser, 
    getUserSelf,
    updateUserSelf } = require('../controllers/user');
const router = express.Router();

router.post('/', createUser);

router.use(basicAuth);

router.get("/self", getUserSelf);
router.put("/self", updateUserSelf);

module.exports = router;