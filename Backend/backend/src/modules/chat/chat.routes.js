const { Router } = require('express');
const ctrl = require('./chat.controller');
const v = require('./chat.validator');
const validate = require('../../common/middleware/validate');
const { chatLimiter } = require('../../common/middleware/rateLimiter');

const router = Router();

// All chat endpoints are public (called by embedded widget) but rate-limited
router.post('/:publicKey/session',              chatLimiter, v.sessionRules,  validate, ctrl.createSession);
router.post('/:publicKey/message',              chatLimiter, v.messageRules,  validate, ctrl.sendMessage);
router.get('/:publicKey/history/:sessionId',    ctrl.getHistory);
router.post('/:publicKey/handoff',              chatLimiter, v.handoffRules,  validate, ctrl.requestHandoff);
router.post('/:publicKey/lead',                 chatLimiter, v.leadRules,     validate, ctrl.captureLead);

module.exports = router;
