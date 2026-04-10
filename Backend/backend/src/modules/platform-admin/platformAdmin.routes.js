const { Router } = require('express');
const ctrl = require('./platformAdmin.controller');
const { authenticate } = require('../../common/middleware/auth');
const { authorize } = require('../../common/middleware/ownership');

const router = Router();
router.use(authenticate);

// Only admins can access platform overview
router.get('/overview', authorize('admin'), ctrl.getOverview);

module.exports = router;
