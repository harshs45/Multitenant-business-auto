const { Router } = require('express');
const ctrl = require('./analytics.controller');
const { authenticate } = require('../../common/middleware/auth');

const router = Router();
router.use(authenticate);

router.get('/bots/:id/overview',        ctrl.getOverview);
router.get('/bots/:id/conversations',   ctrl.getConversations);
router.get('/bots/:id/leads',           ctrl.getLeads);

module.exports = router;
