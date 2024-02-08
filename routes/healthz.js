const express = require('express');
const { healthz,
    methodNotAllowed
} = require('../controllers/healthz');
const middlewares = require('../middlewares');
const router = express.Router();

router.use(middlewares.handlePayload);

router.head('/', methodNotAllowed);
router.get('/', healthz);
router.post('/', methodNotAllowed);
router.put('/', methodNotAllowed);
router.delete('/', methodNotAllowed);
router.options('/', methodNotAllowed);
router.patch('/', methodNotAllowed);

module.exports = router;