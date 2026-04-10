const { Router } = require('express');
const ctrl = require('./formSchema.controller');
const { authenticate } = require('../../common/middleware/auth');

const router = Router();

// GET /api/v1/form-schema?businessType=ecommerce&step=2
router.get('/', authenticate, ctrl.getSchema);

module.exports = router;
