const { Router } = require('express');
const ctrl = require('./themes.controller');
const router = Router();
router.get('/', ctrl.getAll);
router.get('/:themeKey', ctrl.getByKey);
module.exports = router;
