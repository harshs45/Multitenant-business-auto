const { Router } = require('express');
const ctrl = require('./businesses.controller');
const { createRules, updateRules } = require('./businesses.validator');
const validate = require('../../common/middleware/validate');
const { authenticate } = require('../../common/middleware/auth');

const router = Router();

router.use(authenticate);

router.post('/',        createRules, validate, ctrl.create);
router.get('/',         ctrl.list);
router.get('/:id',      ctrl.getById);
router.patch('/:id',    updateRules, validate, ctrl.update);
router.get('/:id/bots', ctrl.listBots);

module.exports = router;
