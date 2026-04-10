const { Router } = require('express');
const ctrl = require('./users.controller');
const { authenticate } = require('../../common/middleware/auth');

const router = Router();

router.get('/profile',   authenticate, ctrl.getProfile);
router.patch('/profile',  authenticate, ctrl.updateProfile);

module.exports = router;
