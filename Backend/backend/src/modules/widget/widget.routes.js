const { Router } = require('express');
const ctrl = require('./widget.controller');
const cors = require('cors');

const router = Router();

/**
 * Public endpoint for widget configuration.
 * Uses CORS to allow embedding in any website (but validated by publicKey).
 */
router.get('/config', cors({ origin: '*' }), ctrl.getConfig);

module.exports = router;
