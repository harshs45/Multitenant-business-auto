const { Router } = require('express');
const ctrl = require('./embed.controller');
const { authenticate } = require('../../common/middleware/auth');
const cors = require('cors');

const router = Router();

// Authenticated routes (bot owner)
router.post('/bots/:id/embed-token',  authenticate, ctrl.createToken);
router.get('/bots/:id/embed-snippet', authenticate, ctrl.getSnippet);

// Public route (called by embedded widget)
router.get('/widget/config/:key', cors({ origin: '*' }), ctrl.getWidgetConfig);

module.exports = router;
