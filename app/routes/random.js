const express = require('express');
const { handleRandomUrls } = require('../controllers/random');

const router = express.Router();

router.all('/', handleRandomUrls);

module.exports = router;