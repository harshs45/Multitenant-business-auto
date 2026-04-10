const { Router } = require('express');
const ctrl = require('./bots.controller');
const v = require('./bots.validator');
const validate = require('../../common/middleware/validate');
const zodValidate = require('../../common/middleware/zodValidate.middleware');
const { generateBotSchema } = require('./bot.validation');
const { authenticate } = require('../../common/middleware/auth');

const router = Router();
router.use(authenticate);

// Single orchestration endpoint — must be BEFORE /:id routes
router.post('/generate', zodValidate(generateBotSchema), ctrl.generate);

router.post('/',                   v.createRules,   validate, ctrl.create);
router.get('/:id',                 v.idParam,       validate, ctrl.getById);
router.patch('/:id',               v.idParam,       validate, ctrl.update);
router.delete('/:id',              v.idParam,       validate, ctrl.remove);

// Per-step wizard endpoints
router.patch('/:id/business-basics',  v.idParam, validate, ctrl.updateBusinessBasics);
router.patch('/:id/audience-config',  v.idParam, validate, ctrl.updateAudienceConfig);
router.patch('/:id/identity',         v.identityRules,  validate, ctrl.updateIdentity);
router.patch('/:id/features',         v.featuresRules,  validate, ctrl.updateFeatures);
router.patch('/:id/theme',            v.themeRules,     validate, ctrl.updateTheme);

// Publish & preview
router.post('/:id/publish',  v.idParam, validate, ctrl.publish);
router.get('/:id/preview',   v.idParam, validate, ctrl.preview);

module.exports = router;
