const { Router } = require('express');
const ctrl = require('./chat.controller');
const v = require('./chat.validator');
const validate = require('../../common/middleware/validate');
const { chatLimiter } = require('../../common/middleware/rateLimiter');

const router = Router();

// All chat endpoints are public (called by embedded widget) but rate-limited
router.post('/:key/session',              chatLimiter, v.sessionRules,  validate, ctrl.createSession);
router.post('/:key/message',              chatLimiter, v.messageRules,  validate, ctrl.sendMessage);
router.get('/:key/history/:sessionId',    ctrl.getHistory);
router.post('/:key/handoff',              chatLimiter, v.handoffRules,  validate, ctrl.requestHandoff);
router.post('/:key/lead',                 chatLimiter, v.leadRules,     validate, ctrl.captureLead);

module.exports = router;
