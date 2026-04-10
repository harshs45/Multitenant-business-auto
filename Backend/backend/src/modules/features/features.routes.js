const { Router } = require('express');
const ctrl = require('./features.controller');
const { authenticate } = require('../../common/middleware/auth');
const router = Router();
router.get('/', authenticate, ctrl.getForType);
module.exports = router;
