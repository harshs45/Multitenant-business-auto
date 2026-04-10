const { Router } = require('express');
const ctrl = require('./billing.controller');
const { authenticate } = require('../../common/middleware/auth');

const router = Router();

router.get('/plans',        ctrl.getPlans);      // public
router.get('/subscription', authenticate, ctrl.getSubscription);
router.post('/webhook',     ctrl.handleWebhook); // called by payment gateway

module.exports = router;
