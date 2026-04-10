const { Router } = require('express');
const ctrl = require('./auth.controller');
const { registerRules, loginRules, refreshRules } = require('./auth.validator');
const validate = require('../../common/middleware/validate');
const { authLimiter } = require('../../common/middleware/rateLimiter');
const { authenticate } = require('../../common/middleware/auth');

const router = Router();

router.post('/register', authLimiter, registerRules, validate, ctrl.register);
router.post('/login',    authLimiter, loginRules,    validate, ctrl.login);
router.post('/refresh',  authLimiter, refreshRules,  validate, ctrl.refresh);
router.post('/logout',   ctrl.logout);
router.get('/me',        authenticate, ctrl.me);

module.exports = router;
